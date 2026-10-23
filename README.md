# EcoBuild Exchange — DBMS Level 3 Project

A sustainable-material advisor combined with a circular furniture resale marketplace, built for the DBMS Experiential Learning Level 3 project.

- **Green material advisor** — describe what you want to build, get eco-friendly material alternatives with carbon footprint and cost comparisons, plus where to buy them.
- **Furniture resale marketplace** — buy/sell secondhand furniture, with an automated 90-day junkyard-referral rule for unsold listings.

## Status

Database design phase is complete and verified against a live PostgreSQL instance. Frontend/app layer has not been started yet — by design, this project is being built DB-first (per the course's 60–70% database-weight requirement) before any UI work.

## What's in this repo so far

```
database/
  schema.sql                                 -- full DDL, executed successfully on PostgreSQL 16
  seed_data.sql                               -- realistic seed data for all 14 tables, FK-safe insert order
  dml_queries.sql                             -- INSERT/UPDATE/DELETE/SELECT + JOIN/GROUP BY/HAVING/ORDER BY/aggregates/subqueries, all verified against live data
  alter_demo.sql                              -- ALTER TABLE (add/drop column, widen type, add constraint) + a real DROP TABLE example
  diagrams/
    chen_er_diagram.svg                      -- conceptual ER model (Chen notation: entities, relationships, 1/M/N cardinality)
    relational_schema_diagram.svg/.png       -- textbook-style relation schema (Elmasri/Navathe format, matches course convention)
    crowsfoot_schema_diagram.svg/.png        -- alternate crow's-foot style schema diagram
docs/
  DBMS_Level_3_Project_Requirements.pdf      -- the current official requirements doc this project is being built against
```

### Current schema (14 tables, PostgreSQL)
`roles, users, projects, green_materials, traditional_materials, material_alternatives, vendors, vendor_listings, project_materials, carbon_reports, furniture_listings, furniture_transactions, junkyards, junkyard_referrals`

Includes: PK/FK constraints, CHECK constraints, 6 indexes (incl. a GIN full-text index), and 2 views (`vendor_price_comparison`, `listings_nearing_expiry`).

## Requirements this project targets (per docs/DBMS_Level_3_Project_Requirements.pdf)

- Database stack: **SQL (PostgreSQL, mandatory) + one of NoSQL or Vector DB** — current design uses PostgreSQL + MongoDB (vendor catalogs) + pgvector (semantic search), which satisfies the "2+ paradigms" rule either way.
- **≥4 advanced SQL features + ≥1 NoSQL/Vector feature** — planned: triggers (90-day junkyard automation), stored procedure (carbon savings calc), views (already in schema), GIN full-text index, vector similarity search, MongoDB aggregation.
- Next.js frontend, kept intentionally minimal/basic until the DB layer (DDL, DML, advanced features, both database paradigms) is fully built and demoed.
- Backend-enforced auth, role-based access (≥2 roles — currently: Admin / Vendor / BuyerSeller).
- No hardcoded credentials — environment variables for DB config.

## Next steps

1. ~~Seed data + DML queries (JOIN, GROUP BY, HAVING, subqueries)~~ ✅ done — see `database/seed_data.sql` and `database/dml_queries.sql`
2. Advanced SQL features: trigger (90-day junkyard automation), stored procedure (carbon savings calc) — views already exist in `schema.sql`; 4th feature TBD (full-text search demo query, or transaction block)
3. NoSQL layer (MongoDB vendor catalogs) + aggregation pipeline, and/or pgvector similarity search — required: at least one of these
4. Minimal Next.js interface + API routes, backend auth with role-based access (≥2 roles)
5. Documentation package: objectives, functional requirements, database choice justification, data dictionary, system architecture, screenshots, testing results, conclusion
