"""
EcoBuild Exchange — Vendor listing sync pipeline (NoSQL -> SQL)

Real pipeline shape:
  1. A scheduled scraper/fetch job pulls product listings from real vendor
     sites (IndiaMART, TradeIndia, vendor pages) and writes them AS-IS into
     a MongoDB collection `raw_vendor_listings` — no cleanup, no schema
     enforcement, because every source site structures its data differently
     (see raw_vendor_listings_seed.json for real examples: missing prices,
     inconsistent units, mismatched metadata tags).
  2. This script reads that raw collection, runs a MongoDB aggregation to
     summarize it, then normalizes + matches each raw listing to a
     canonical green_materials row, and emits the clean SQL rows that the
     Next.js app actually queries.

Connection:
  Set MONGO_URI to point at a real MongoDB instance (Atlas or self-hosted).
  If MONGO_URI is unset, this script falls back to `mongomock`, an
  in-memory implementation of the pymongo API, purely so this pipeline is
  runnable and demoable without a live Mongo server during development.
  The pymongo calls below are unchanged either way — swapping in a real
  MONGO_URI is the only change needed to go from demo to production.
"""

import json
import os
import re
from pathlib import Path

MONGO_URI = os.environ.get("MONGO_URI")

if MONGO_URI:
    from pymongo import MongoClient
    client = MongoClient(MONGO_URI)
else:
    import mongomock
    client = mongomock.MongoClient()
    print("[vendor_sync] MONGO_URI not set — using mongomock in-memory client for this run.")

db = client["ecobuild_exchange"]
raw_collection = db["raw_vendor_listings"]

SEED_PATH = Path(__file__).parent / "raw_vendor_listings_seed.json"


def load_raw_seed():
    """Load the real scraped listings into the raw collection (idempotent)."""
    raw_collection.delete_many({})
    with open(SEED_PATH) as f:
        docs = json.load(f)
    raw_collection.insert_many(docs)
    print(f"[vendor_sync] Loaded {len(docs)} raw vendor documents into MongoDB.")


def run_aggregation():
    """
    Real MongoDB aggregation pipeline: group raw listings by source site,
    count how many have a usable price vs. quote-only, and compute average
    price where available. This is the NoSQL aggregation advanced feature.
    """
    pipeline = [
        {
            "$group": {
                "_id": "$source_site",
                "total_listings": {"$sum": 1},
                "priced_listings": {
                    "$sum": {"$cond": [{"$ne": ["$price", None]}, 1, 0]}
                },
                "avg_price": {"$avg": "$price"},
            }
        },
        {"$sort": {"total_listings": -1}},
    ]
    results = list(raw_collection.aggregate(pipeline))
    print("\n[vendor_sync] Aggregation — listings grouped by source site:")
    for r in results:
        avg = f"{r['avg_price']:.2f}" if r["avg_price"] is not None else "n/a"
        print(f"  {r['_id']:<16} total={r['total_listings']}  priced={r['priced_listings']}  avg_price={avg}")
    return results


# Canonical material matching: maps keywords found in raw product names to
# the matching row in the SQL green_materials table (by material_id, as
# seeded in seed_data.sql).
MATERIAL_KEYWORDS = {
    1: ["fly ash"],            # Fly Ash Cement
    2: ["cseb", "earth block", "mud block"],  # Compressed Stabilized Earth Block
    3: ["bamboo"],              # Bamboo Flooring
    4: ["recycled steel", "rebar"],  # Recycled Steel Rebar
    5: ["reclaimed wood", "reclaimed"],  # Reclaimed Wood Panel
    6: ["hempcrete", "hemp"],   # Hempcrete Block (hemp hurds kept as a related/raw match)
}


def match_material_id(product_name: str):
    name = product_name.lower()
    for material_id, keywords in MATERIAL_KEYWORDS.items():
        if any(kw in name for kw in keywords):
            return material_id
    return None


def normalize_and_emit_sql():
    """
    Read raw listings, keep only ones with a usable price, match each to a
    canonical green_materials row, and emit clean INSERT statements for the
    SQL vendor_listings / vendors tables.
    """
    docs = list(raw_collection.find({"price": {"$ne": None}}))
    vendors_seen = {}
    vendor_inserts = []
    listing_inserts = []

    for doc in docs:
        material_id = match_material_id(doc["product_name"])
        if material_id is None:
            print(f"[vendor_sync] SKIPPED (no material match): {doc['product_name']}")
            continue

        seller = doc["seller_name"]
        if seller not in vendors_seen:
            vendor_inserts.append(
                f"INSERT INTO vendors (name, website, location) VALUES "
                f"({sql_str(seller)}, {sql_str(doc['source_url'])}, {sql_str(doc['seller_location'])}) "
                f"ON CONFLICT DO NOTHING RETURNING vendor_id;"
            )
            vendors_seen[seller] = True

        listing_inserts.append({
            "vendor_name": seller,
            "material_id": material_id,
            "price": doc["price"],
            "url": doc["source_url"],
            "location": doc.get("seller_location", "India"),
            "site_domain": re.sub(r"^https?://(?:m\.)?([^/]+).*$", r"https://\1", doc["source_url"]),
        })

    return vendor_inserts, listing_inserts


def sql_str(value):
    if value is None:
        return "NULL"
    return "'" + str(value).replace("'", "''") + "'"


if __name__ == "__main__":
    load_raw_seed()
    run_aggregation()
    vendor_sql, listings = normalize_and_emit_sql()

    print(f"\n[vendor_sync] Matched {len(listings)} real listings to canonical materials:")
    for l in listings:
        print(f"  material_id={l['material_id']}  {l['vendor_name']:<32} ₹{l['price']}  {l['url']}")

    # Write the normalized SQL for the live DB load step
    out_path = Path(__file__).parent.parent / "real_vendor_data.sql"
    with open(out_path, "w") as f:
        f.write("-- Auto-generated by database/nosql/vendor_sync.py from real scraped listings\n")
        f.write("-- Replaces the synthetic vendor_listings seed rows with real, web-sourced data\n\n")
        f.write("DELETE FROM vendor_listings;\n")
        f.write("DELETE FROM vendors;\n\n")

        seen_vendors = {}
        for l in listings:
            if l["vendor_name"] not in seen_vendors:
                seen_vendors[l["vendor_name"]] = True
                f.write(
                    f"INSERT INTO vendors (name, website, location) "
                    f"VALUES ({sql_str(l['vendor_name'])}, {sql_str(l['site_domain'])}, {sql_str(l['location'])});\n"
                )
        f.write("\n")
        for l in listings:
            f.write(
                f"INSERT INTO vendor_listings (vendor_id, material_id, price, url) "
                f"VALUES ((SELECT vendor_id FROM vendors WHERE name = {sql_str(l['vendor_name'])}), "
                f"{l['material_id']}, {l['price']}, {sql_str(l['url'])});\n"
            )

    print(f"\n[vendor_sync] Wrote normalized SQL to {out_path}")
