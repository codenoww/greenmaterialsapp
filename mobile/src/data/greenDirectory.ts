export type HouseArea =
  | "Foundation"
  | "Walls"
  | "Roof"
  | "Flooring"
  | "Insulation"
  | "Paint"
  | "Windows"
  | "Kitchen"
  | "Bathroom";

export type GreenMaterial = {
  id: string;
  area: HouseArea;
  usualMaterial: string;
  name: string;
  category: string;
  fit: string;
  sustainabilityScore: number;
  embodiedCarbon: string;
  carbonSaving: string;
  recycledContent: string;
  lifespan: string;
  certifications: string[];
  stats: {
    label: string;
    value: string;
  }[];
  tradeoffs: string;
  shop: {
    label: string;
    url: string;
    region: string;
  }[];
};

export type ScrapPartner = {
  id: string;
  name: string;
  type: "Scrapyard" | "Recycler" | "Resale" | "Donation";
  city: string;
  accepts: string[];
  distanceKm: number;
  contact: string;
  url: string;
  note: string;
};

export const materialAreas: HouseArea[] = [
  "Foundation",
  "Walls",
  "Roof",
  "Flooring",
  "Insulation",
  "Paint",
  "Windows",
  "Kitchen",
  "Bathroom",
];

export const greenMaterials: GreenMaterial[] = [
  {
    id: "low-carbon-concrete",
    area: "Foundation",
    usualMaterial: "Portland cement concrete",
    name: "GGBS / fly-ash low-carbon concrete",
    category: "Structural concrete",
    fit: "Best for slabs, footings, and structural pours where the engineer can approve mix design.",
    sustainabilityScore: 91,
    embodiedCarbon: "180-260 kgCO2e/m3",
    carbonSaving: "30-55% lower cement emissions",
    recycledContent: "25-60% cement replacement",
    lifespan: "50+ years",
    certifications: ["EPD-ready", "LEED MR", "IGBC MR"],
    stats: [
      { label: "CO2 reduction", value: "30-55%" },
      { label: "Fly ash/GGBS", value: "25-60%" },
      { label: "LEED potential", value: "+2 MR" },
    ],
    tradeoffs: "Can need longer curing time and supplier coordination.",
    shop: [
      {
        label: "Holcim ECOPact",
        url: "https://www.holcim.com/what-we-do/ready-mix-concrete/ecopact",
        region: "Global",
      },
      {
        label: "ACC ECOMaxX",
        url: "https://www.acclimited.com/products/ready-mix-concrete",
        region: "India",
      },
    ],
  },
  {
    id: "cseb-blocks",
    area: "Walls",
    usualMaterial: "Burnt clay brick",
    name: "Compressed stabilized earth blocks",
    category: "Walling",
    fit: "Best for non-load-bearing and low-rise wall systems with local soil testing.",
    sustainabilityScore: 88,
    embodiedCarbon: "40-90 kgCO2e/m3",
    carbonSaving: "50-70% lower than fired brick",
    recycledContent: "Local soil, low cement",
    lifespan: "40+ years",
    certifications: ["Local material credit", "Low-energy production"],
    stats: [
      { label: "Energy saving", value: "Up to 70%" },
      { label: "Thermal mass", value: "High" },
      { label: "Local sourcing", value: "Strong" },
    ],
    tradeoffs: "Needs moisture detailing, skilled masons, and quality-controlled blocks.",
    shop: [
      {
        label: "Auroville Earth Institute",
        url: "https://www.earth-auroville.com/",
        region: "India",
      },
      {
        label: "Mitti Cool / earth block suppliers",
        url: "https://www.indiamart.com/proddetail/compressed-stabilized-earth-block-21911738788.html",
        region: "India marketplace",
      },
    ],
  },
  {
    id: "cool-metal-roof",
    area: "Roof",
    usualMaterial: "Asphalt shingles or RCC roof finish",
    name: "High-SRI recycled metal roofing",
    category: "Roofing",
    fit: "Best where heat gain, rainwater collection, and long service life matter.",
    sustainabilityScore: 84,
    embodiedCarbon: "5-12 kgCO2e/m2",
    carbonSaving: "20-40% cooling-load reduction",
    recycledContent: "25-95%",
    lifespan: "40-70 years",
    certifications: ["Energy Star", "LEED SS", "EPD options"],
    stats: [
      { label: "Solar reflectance", value: "0.65+" },
      { label: "Recycled metal", value: "25-95%" },
      { label: "Service life", value: "40+ yrs" },
    ],
    tradeoffs: "Requires acoustic insulation and careful flashing details.",
    shop: [
      {
        label: "Tata BlueScope Steel",
        url: "https://tatabluescopesteel.com/",
        region: "India",
      },
      {
        label: "Fabral metal roofing",
        url: "https://fabral.com/",
        region: "USA",
      },
    ],
  },
  {
    id: "bamboo-flooring",
    area: "Flooring",
    usualMaterial: "Virgin hardwood or vitrified tile",
    name: "FSC bamboo flooring",
    category: "Flooring",
    fit: "Best for dry interior rooms needing a warm finish and fast-renewing material.",
    sustainabilityScore: 86,
    embodiedCarbon: "7-14 kgCO2e/m2",
    carbonSaving: "Rapidly renewable crop, 5-7 year harvest",
    recycledContent: "Renewable bio-based material",
    lifespan: "20-30 years",
    certifications: ["FSC", "FloorScore", "LEED MR/EQ"],
    stats: [
      { label: "Renewal cycle", value: "5-7 yrs" },
      { label: "VOC target", value: "<0.5 mg/m3" },
      { label: "Hardness", value: "High" },
    ],
    tradeoffs: "Specify low-formaldehyde adhesives and avoid wet areas.",
    shop: [
      {
        label: "Bamboo India",
        url: "https://bambooindia.com/",
        region: "India",
      },
      {
        label: "Cali Bamboo",
        url: "https://www.calibamboo.com/",
        region: "USA",
      },
    ],
  },
  {
    id: "cellulose-insulation",
    area: "Insulation",
    usualMaterial: "Foam board or fiberglass",
    name: "Recycled cellulose insulation",
    category: "Thermal insulation",
    fit: "Best for walls, attics, and retrofits where low embodied carbon is a priority.",
    sustainabilityScore: 93,
    embodiedCarbon: "Often carbon-storing",
    carbonSaving: "70-90% recycled paper",
    recycledContent: "70-90%",
    lifespan: "30+ years",
    certifications: ["GREENGUARD options", "LEED MR", "Low VOC"],
    stats: [
      { label: "R-value", value: "3.2-3.8/in" },
      { label: "Recycled content", value: "70-90%" },
      { label: "Air sealing", value: "Strong" },
    ],
    tradeoffs: "Needs moisture control and professional dense-pack installation.",
    shop: [
      {
        label: "Greenfiber",
        url: "https://www.greenfiber.com/",
        region: "USA",
      },
      {
        label: "IndiaMART cellulose insulation",
        url: "https://www.indiamart.com/proddetail/cellulose-insulation-2852581431097.html",
        region: "India marketplace",
      },
    ],
  },
  {
    id: "low-voc-paint",
    area: "Paint",
    usualMaterial: "Conventional acrylic paint",
    name: "Zero / low-VOC interior paint",
    category: "Finishes",
    fit: "Best for interior walls, ceilings, schools, healthcare, and occupied renovations.",
    sustainabilityScore: 89,
    embodiedCarbon: "Low operational health impact",
    carbonSaving: "Improves indoor environmental quality",
    recycledContent: "Varies",
    lifespan: "6-10 years",
    certifications: ["Green Seal", "GREENGUARD", "LEED EQ"],
    stats: [
      { label: "VOC", value: "<5 g/L" },
      { label: "Odor", value: "Low" },
      { label: "LEED potential", value: "+1 EQ" },
    ],
    tradeoffs: "Confirm tint VOCs and durability for high-traffic zones.",
    shop: [
      {
        label: "Asian Paints Royale Health Shield",
        url: "https://www.asianpaints.com/products/paints-and-textures/interior-walls/royale-health-shield.html",
        region: "India",
      },
      {
        label: "Benjamin Moore Eco Spec",
        url: "https://www.benjaminmoore.com/en-us/interior-exterior-paints-stains/product-catalog/es/es-eco-spec",
        region: "USA",
      },
    ],
  },
  {
    id: "thermally-broken-windows",
    area: "Windows",
    usualMaterial: "Single-glazed aluminium frame",
    name: "Double glazing with thermally broken frames",
    category: "Envelope",
    fit: "Best for facades where cooling load, comfort, and condensation control are key.",
    sustainabilityScore: 82,
    embodiedCarbon: "Higher upfront, lower energy demand",
    carbonSaving: "15-30% HVAC energy reduction",
    recycledContent: "Aluminium options available",
    lifespan: "25-35 years",
    certifications: ["NFRC", "IGBC energy", "LEED EA"],
    stats: [
      { label: "U-value", value: "1.6-2.8" },
      { label: "SHGC", value: "0.25-0.40" },
      { label: "Energy saving", value: "15-30%" },
    ],
    tradeoffs: "Balance embodied carbon against climate-specific operating savings.",
    shop: [
      {
        label: "Saint-Gobain Glass",
        url: "https://in.saint-gobain-glass.com/",
        region: "India",
      },
      {
        label: "Andersen energy efficient windows",
        url: "https://www.andersenwindows.com/ideas-and-inspiration/energy-efficiency/",
        region: "USA",
      },
    ],
  },
  {
    id: "reclaimed-wood-cabinets",
    area: "Kitchen",
    usualMaterial: "Virgin plywood cabinets",
    name: "Reclaimed wood or FSC plywood cabinetry",
    category: "Millwork",
    fit: "Best for built-ins, counters, shelving, and kitchen carcasses with low-VOC finishes.",
    sustainabilityScore: 87,
    embodiedCarbon: "Stores carbon, avoids virgin timber",
    carbonSaving: "40-65% lower new wood demand",
    recycledContent: "Reclaimed / FSC certified",
    lifespan: "20+ years",
    certifications: ["FSC", "CARB Phase 2", "LEED MR/EQ"],
    stats: [
      { label: "Virgin timber avoided", value: "40-65%" },
      { label: "Formaldehyde", value: "NAF/ULEF" },
      { label: "Repairability", value: "High" },
    ],
    tradeoffs: "Availability varies and dimensions may need more fabrication planning.",
    shop: [
      {
        label: "Bamboo House India",
        url: "https://www.bamboohouseindia.org/",
        region: "India",
      },
      {
        label: "Etsy reclaimed cabinet hardware",
        url: "https://www.etsy.com/market/reclaimed_cabinets",
        region: "Marketplace",
      },
    ],
  },
  {
    id: "recycled-ceramic-tile",
    area: "Bathroom",
    usualMaterial: "Conventional ceramic tile",
    name: "Recycled-content ceramic or terrazzo tile",
    category: "Wet-area finish",
    fit: "Best for bathrooms, backsplashes, and durable wet-zone floor finishes.",
    sustainabilityScore: 80,
    embodiedCarbon: "8-18 kgCO2e/m2",
    carbonSaving: "10-35% recycled mineral content",
    recycledContent: "10-70%",
    lifespan: "30+ years",
    certifications: ["EPD options", "LEED MR", "Declare options"],
    stats: [
      { label: "Recycled content", value: "10-70%" },
      { label: "Water resistance", value: "High" },
      { label: "Service life", value: "30+ yrs" },
    ],
    tradeoffs: "Check slip resistance, grout maintenance, and kiln energy disclosures.",
    shop: [
      {
        label: "Fireclay recycled tile",
        url: "https://www.fireclaytile.com/",
        region: "USA",
      },
      {
        label: "Somany Ceramics",
        url: "https://www.somanyceramics.com/",
        region: "India",
      },
    ],
  },
  {
    id: "hempcrete-infill",
    area: "Walls",
    usualMaterial: "Concrete block infill",
    name: "Hempcrete wall infill",
    category: "Bio-based walling",
    fit: "Best for non-structural wall infill with timber or steel frames.",
    sustainabilityScore: 92,
    embodiedCarbon: "Often carbon-storing",
    carbonSaving: "Can store more CO2 than it emits",
    recycledContent: "Hemp hurd and lime binder",
    lifespan: "50+ years",
    certifications: ["Bio-based", "Low VOC", "LEED MR"],
    stats: [
      { label: "Thermal", value: "High" },
      { label: "Vapor open", value: "Yes" },
      { label: "Carbon", value: "Stores CO2" },
    ],
    tradeoffs: "Not structural and needs moisture-safe detailing.",
    shop: [
      { label: "Hempitecture", url: "https://www.hempitecture.com/", region: "USA" },
      { label: "IsoHemp", url: "https://www.isohemp.com/en", region: "Europe" },
    ],
  },
  {
    id: "reclaimed-brick",
    area: "Walls",
    usualMaterial: "New fired brick",
    name: "Reclaimed brick masonry",
    category: "Salvaged walling",
    fit: "Best for feature walls, boundary walls, and projects with demolition salvage access.",
    sustainabilityScore: 90,
    embodiedCarbon: "Very low additional carbon",
    carbonSaving: "Avoids new kiln firing",
    recycledContent: "100% reclaimed possible",
    lifespan: "50+ years",
    certifications: ["Reuse credit", "LEED MR"],
    stats: [
      { label: "Reuse", value: "Up to 100%" },
      { label: "Kiln energy", value: "Avoided" },
      { label: "Durability", value: "High" },
    ],
    tradeoffs: "Needs cleaning, grading, and strength checks.",
    shop: [
      { label: "Salvoweb", url: "https://www.salvoweb.com/", region: "Global" },
      { label: "Local salvage listings", url: "https://www.justdial.com/", region: "India" },
    ],
  },
  {
    id: "cork-flooring",
    area: "Flooring",
    usualMaterial: "Vinyl flooring",
    name: "Natural cork flooring",
    category: "Flooring",
    fit: "Best for bedrooms, studios, and quiet interiors needing comfort underfoot.",
    sustainabilityScore: 85,
    embodiedCarbon: "Low bio-based finish",
    carbonSaving: "Harvested bark regrows",
    recycledContent: "Renewable cork bark",
    lifespan: "15-25 years",
    certifications: ["FSC options", "FloorScore", "Low VOC"],
    stats: [
      { label: "Renewable", value: "Bark regrowth" },
      { label: "Acoustic", value: "Good" },
      { label: "VOC", value: "Low" },
    ],
    tradeoffs: "Needs sealing and is not ideal for very wet spaces.",
    shop: [
      { label: "Amorim Wise", url: "https://www.amorimwise.com/", region: "Global" },
      { label: "Green Building Supply cork", url: "https://www.greenbuildingsupply.com/", region: "USA" },
    ],
  },
  {
    id: "sheep-wool-insulation",
    area: "Insulation",
    usualMaterial: "Fiberglass batt insulation",
    name: "Sheep wool insulation",
    category: "Thermal insulation",
    fit: "Best for roofs, walls, and breathable envelope assemblies.",
    sustainabilityScore: 88,
    embodiedCarbon: "Low bio-based material",
    carbonSaving: "Renewable fiber with low processing energy",
    recycledContent: "Renewable wool fiber",
    lifespan: "50+ years",
    certifications: ["Low VOC", "Bio-based", "LEED MR"],
    stats: [
      { label: "R-value", value: "3.5/in" },
      { label: "Humidity", value: "Buffers" },
      { label: "Fiber", value: "Renewable" },
    ],
    tradeoffs: "Higher upfront cost and pest treatment must be verified.",
    shop: [
      { label: "Havelock Wool", url: "https://havelockwool.com/", region: "USA" },
      { label: "Thermafleece", url: "https://www.thermafleece.com/", region: "UK" },
    ],
  },
  {
    id: "lime-plaster",
    area: "Paint",
    usualMaterial: "Gypsum putty with acrylic paint",
    name: "Natural lime plaster finish",
    category: "Wall finish",
    fit: "Best for breathable walls, heritage projects, and low-toxicity interiors.",
    sustainabilityScore: 83,
    embodiedCarbon: "Lower than cement plaster",
    carbonSaving: "Reabsorbs some CO2 while curing",
    recycledContent: "Mineral lime and sand",
    lifespan: "25+ years",
    certifications: ["Low VOC", "Natural finish"],
    stats: [
      { label: "VOC", value: "Near zero" },
      { label: "Breathable", value: "Yes" },
      { label: "Repairable", value: "High" },
    ],
    tradeoffs: "Needs skilled application and slower curing.",
    shop: [
      { label: "Earthaus Plaster", url: "https://earthausplaster.com/", region: "USA" },
      { label: "LimeStrong", url: "https://www.limestrong.com/", region: "India" },
    ],
  },
  {
    id: "recycled-glass-countertop",
    area: "Kitchen",
    usualMaterial: "Virgin stone countertop",
    name: "Recycled glass countertop",
    category: "Counter surface",
    fit: "Best for kitchens, vanities, and reception counters needing durable visual finish.",
    sustainabilityScore: 81,
    embodiedCarbon: "Lower virgin mineral extraction",
    carbonSaving: "Uses post-consumer glass aggregate",
    recycledContent: "70-85% recycled glass options",
    lifespan: "25+ years",
    certifications: ["LEED MR", "Declare options"],
    stats: [
      { label: "Recycled glass", value: "70-85%" },
      { label: "Durability", value: "High" },
      { label: "VOC", value: "Low" },
    ],
    tradeoffs: "Binder choice matters; compare resin and cement-based options.",
    shop: [
      { label: "IceStone", url: "https://icestoneusa.com/", region: "USA" },
      { label: "Vetrazzo", url: "https://www.vetrazzo.com/", region: "USA" },
    ],
  },
  {
    id: "rammed-earth-foundation-wall",
    area: "Foundation",
    usualMaterial: "Reinforced concrete retaining wall",
    name: "Stabilized rammed earth foundation wall",
    category: "Substructure walling",
    fit: "Best for low-rise projects where soil, seismic, and moisture conditions are validated.",
    sustainabilityScore: 79,
    embodiedCarbon: "70-140 kgCO2e/m3",
    carbonSaving: "Lower cement demand than concrete walls",
    recycledContent: "Local mineral soil",
    lifespan: "50+ years",
    certifications: ["Local material credit", "Low processed content"],
    stats: [
      { label: "Local content", value: "High" },
      { label: "Thermal mass", value: "High" },
      { label: "Cement", value: "Low" },
    ],
    tradeoffs: "Needs waterproofing, structural approval, and specialist contractors.",
    shop: [
      { label: "Rammed Earth Works", url: "https://rammedearthworks.com/", region: "USA" },
      { label: "Auroville Earth Institute", url: "https://www.earth-auroville.com/", region: "India" },
    ],
  },
  {
    id: "recycled-aggregate-concrete",
    area: "Foundation",
    usualMaterial: "Concrete with virgin aggregate",
    name: "Recycled aggregate concrete",
    category: "Structural concrete",
    fit: "Best for slabs, pavements, and non-critical concrete elements when local codes allow.",
    sustainabilityScore: 82,
    embodiedCarbon: "180-300 kgCO2e/m3",
    carbonSaving: "Reduces virgin aggregate extraction",
    recycledContent: "20-50% recycled aggregate",
    lifespan: "40+ years",
    certifications: ["EPD options", "LEED MR"],
    stats: [
      { label: "Recycled aggregate", value: "20-50%" },
      { label: "Waste diverted", value: "High" },
      { label: "LEED potential", value: "+1 MR" },
    ],
    tradeoffs: "Strength, water absorption, and workability must be mix-tested.",
    shop: [
      { label: "CDE recycled aggregates", url: "https://www.cdegroup.com/applications/recycled-aggregates", region: "Global" },
      { label: "Local RMC suppliers", url: "https://www.indiamart.com/", region: "India marketplace" },
    ],
  },
  {
    id: "aac-blocks",
    area: "Walls",
    usualMaterial: "Red clay brick",
    name: "Autoclaved aerated concrete blocks",
    category: "Lightweight walling",
    fit: "Best for non-load-bearing walls where thermal performance and speed matter.",
    sustainabilityScore: 76,
    embodiedCarbon: "Lower mass per m2 than dense masonry",
    carbonSaving: "Lower transport load and better insulation",
    recycledContent: "Fly ash options available",
    lifespan: "40+ years",
    certifications: ["IGBC MR", "LEED energy support"],
    stats: [
      { label: "Weight", value: "Light" },
      { label: "Thermal", value: "Good" },
      { label: "Build speed", value: "Fast" },
    ],
    tradeoffs: "Needs correct anchors, plaster system, and moisture detailing.",
    shop: [
      { label: "Magicrete AAC Blocks", url: "https://www.magicrete.in/", region: "India" },
      { label: "Biltech AAC", url: "https://www.biltechindia.com/", region: "India" },
    ],
  },
  {
    id: "terracotta-roof-tile",
    area: "Roof",
    usualMaterial: "Asphalt shingles",
    name: "Terracotta clay roof tiles",
    category: "Roofing",
    fit: "Best for warm climates, ventilated pitched roofs, and long-life residential roofs.",
    sustainabilityScore: 78,
    embodiedCarbon: "Moderate, long service life",
    carbonSaving: "Passive cooling through thermal mass and ventilation",
    recycledContent: "Natural clay",
    lifespan: "50-100 years",
    certifications: ["Natural material", "Cool roof support"],
    stats: [
      { label: "Service life", value: "50+ yrs" },
      { label: "Cooling", value: "Passive" },
      { label: "Repairable", value: "High" },
    ],
    tradeoffs: "Heavy roof load and kiln energy must be considered.",
    shop: [
      { label: "Mangalore tiles", url: "https://www.indiamart.com/proddetail/mangalore-roofing-tiles-2852423695630.html", region: "India marketplace" },
      { label: "Ludowici roof tile", url: "https://ludowici.com/", region: "USA" },
    ],
  },
  {
    id: "green-roof-system",
    area: "Roof",
    usualMaterial: "Exposed concrete roof",
    name: "Extensive green roof system",
    category: "Roof assembly",
    fit: "Best for flat roofs needing heat-island reduction, stormwater control, and biodiversity.",
    sustainabilityScore: 86,
    embodiedCarbon: "Higher upfront, operational and stormwater benefits",
    carbonSaving: "Reduces heat gain and runoff",
    recycledContent: "Recycled drainage layers available",
    lifespan: "Membrane protection can extend roof life",
    certifications: ["LEED SS", "WELL support"],
    stats: [
      { label: "Runoff", value: "-50-80%" },
      { label: "Heat island", value: "Lower" },
      { label: "Habitat", value: "Adds" },
    ],
    tradeoffs: "Needs structural load check, waterproofing, and maintenance access.",
    shop: [
      { label: "ZinCo Green Roof", url: "https://zinco-greenroof.com/", region: "Global" },
      { label: "LiveRoof", url: "https://liveroof.com/", region: "USA" },
    ],
  },
  {
    id: "recycled-rubber-flooring",
    area: "Flooring",
    usualMaterial: "Vinyl sheet flooring",
    name: "Recycled rubber flooring",
    category: "Resilient flooring",
    fit: "Best for gyms, play areas, service spaces, and high-impact interiors.",
    sustainabilityScore: 77,
    embodiedCarbon: "Uses post-consumer tire rubber",
    carbonSaving: "Diverts rubber waste from landfill",
    recycledContent: "50-90%",
    lifespan: "15-25 years",
    certifications: ["FloorScore options", "LEED MR"],
    stats: [
      { label: "Recycled", value: "50-90%" },
      { label: "Impact", value: "High" },
      { label: "Maintenance", value: "Low" },
    ],
    tradeoffs: "Check odor, VOC certification, and color stability.",
    shop: [
      { label: "Ecore flooring", url: "https://www.ecoreintl.com/", region: "USA" },
      { label: "Rubber flooring suppliers", url: "https://www.indiamart.com/", region: "India marketplace" },
    ],
  },
  {
    id: "linoleum-flooring",
    area: "Flooring",
    usualMaterial: "PVC vinyl flooring",
    name: "Natural linoleum flooring",
    category: "Resilient flooring",
    fit: "Best for schools, healthcare, kitchens, and commercial interiors needing low-toxicity floors.",
    sustainabilityScore: 84,
    embodiedCarbon: "Bio-based ingredients",
    carbonSaving: "Avoids PVC and plasticizers",
    recycledContent: "Linseed oil, wood flour, jute",
    lifespan: "20-40 years",
    certifications: ["Declare options", "FloorScore", "LEED EQ"],
    stats: [
      { label: "Bio-based", value: "High" },
      { label: "PVC", value: "None" },
      { label: "Life", value: "20+ yrs" },
    ],
    tradeoffs: "Needs correct substrate, sealing, and moisture control.",
    shop: [
      { label: "Forbo Marmoleum", url: "https://www.forbo.com/flooring/en-gl/products/linoleum/cfctp7", region: "Global" },
      { label: "Armstrong linoleum", url: "https://www.armstrongflooring.com/", region: "USA" },
    ],
  },
  {
    id: "wood-fiber-insulation",
    area: "Insulation",
    usualMaterial: "Mineral wool or foam board",
    name: "Wood fiber insulation board",
    category: "Thermal insulation",
    fit: "Best for roofs and walls needing vapor-open exterior insulation.",
    sustainabilityScore: 90,
    embodiedCarbon: "Bio-based, carbon-storing",
    carbonSaving: "Stores biogenic carbon",
    recycledContent: "Wood fiber from managed forestry",
    lifespan: "50+ years",
    certifications: ["FSC options", "PEFC options", "Low VOC"],
    stats: [
      { label: "R-value", value: "3.6/in" },
      { label: "Carbon", value: "Stores" },
      { label: "Acoustic", value: "Good" },
    ],
    tradeoffs: "Needs rain protection and careful vapor design.",
    shop: [
      { label: "Gutex", url: "https://gutex.de/en/", region: "Europe/Global" },
      { label: "STEICO", url: "https://www.steico.com/en", region: "Global" },
    ],
  },
  {
    id: "mineral-wool-insulation",
    area: "Insulation",
    usualMaterial: "Foam insulation",
    name: "Recycled-content mineral wool",
    category: "Thermal insulation",
    fit: "Best for fire-rated walls, facades, and acoustic assemblies.",
    sustainabilityScore: 74,
    embodiedCarbon: "Moderate, durable mineral product",
    carbonSaving: "Recycled slag and long operating savings",
    recycledContent: "Up to 40-70% options",
    lifespan: "50+ years",
    certifications: ["GREENGUARD options", "EPD options"],
    stats: [
      { label: "Fire", value: "Non-comb." },
      { label: "Recycled", value: "40%+" },
      { label: "Acoustic", value: "High" },
    ],
    tradeoffs: "Compare manufacturer EPDs; embodied carbon varies by plant energy.",
    shop: [
      { label: "ROCKWOOL", url: "https://www.rockwool.com/", region: "Global" },
      { label: "Knauf mineral wool", url: "https://www.knaufinsulation.com/", region: "Global" },
    ],
  },
  {
    id: "recycled-aluminium-windows",
    area: "Windows",
    usualMaterial: "Virgin aluminium window frames",
    name: "Recycled aluminium thermally broken windows",
    category: "Envelope",
    fit: "Best for durable high-performance windows where recycled frame content is documented.",
    sustainabilityScore: 80,
    embodiedCarbon: "Lower than virgin aluminium frames",
    carbonSaving: "Recycled aluminium can cut frame carbon substantially",
    recycledContent: "25-75% options",
    lifespan: "30+ years",
    certifications: ["EPD options", "NFRC", "LEED MR/EA"],
    stats: [
      { label: "Recycled Al", value: "25-75%" },
      { label: "Thermal break", value: "Yes" },
      { label: "Life", value: "30+ yrs" },
    ],
    tradeoffs: "Ask for plant-specific EPD and recycled-content declaration.",
    shop: [
      { label: "Hydro CIRCAL", url: "https://www.hydro.com/en/aluminium/products/low-carbon-and-recycled-aluminium/hydro-circal/", region: "Global" },
      { label: "Reynaers Aluminium", url: "https://www.reynaers.com/", region: "Global" },
    ],
  },
  {
    id: "timber-windows",
    area: "Windows",
    usualMaterial: "uPVC or aluminium frames",
    name: "FSC timber windows with double glazing",
    category: "Envelope",
    fit: "Best for low-rise residential projects prioritizing repairability and lower frame carbon.",
    sustainabilityScore: 84,
    embodiedCarbon: "Lower frame carbon, stores biogenic carbon",
    carbonSaving: "Avoids high-carbon virgin aluminium",
    recycledContent: "FSC renewable timber",
    lifespan: "30-60 years with maintenance",
    certifications: ["FSC", "PEFC", "Low VOC finishes"],
    stats: [
      { label: "Frame carbon", value: "Low" },
      { label: "Repair", value: "High" },
      { label: "Glazing", value: "Double" },
    ],
    tradeoffs: "Requires maintenance and detailing against moisture.",
    shop: [
      { label: "Marvin wood windows", url: "https://www.marvin.com/", region: "USA" },
      { label: "Velfac wood/aluminium", url: "https://velfac.com/", region: "Europe" },
    ],
  },
  {
    id: "wheatboard-cabinets",
    area: "Kitchen",
    usualMaterial: "MDF with formaldehyde resin",
    name: "Wheatboard cabinet panels",
    category: "Millwork",
    fit: "Best for cabinet carcasses, shelving, and interior built-ins.",
    sustainabilityScore: 82,
    embodiedCarbon: "Agricultural-residue board",
    carbonSaving: "Uses crop waste instead of virgin wood fiber",
    recycledContent: "Agricultural residue",
    lifespan: "15-25 years",
    certifications: ["NAF options", "CARB Phase 2", "LEED EQ"],
    stats: [
      { label: "Formaldehyde", value: "NAF" },
      { label: "Residue use", value: "High" },
      { label: "Indoor air", value: "Better" },
    ],
    tradeoffs: "Moisture protection and edge sealing are important.",
    shop: [
      { label: "Agriboard panels", url: "https://www.indiamart.com/proddetail/agri-board-2853175491412.html", region: "India marketplace" },
      { label: "Eco-friendly panel suppliers", url: "https://www.greenbuildingsupply.com/", region: "USA" },
    ],
  },
  {
    id: "stainless-steel-recycled-sink",
    area: "Kitchen",
    usualMaterial: "Composite resin sink",
    name: "Recycled stainless steel sink",
    category: "Kitchen fixture",
    fit: "Best for kitchens needing durable, recyclable fixtures.",
    sustainabilityScore: 75,
    embodiedCarbon: "Energy-intensive but long-lived and recyclable",
    carbonSaving: "High recycled-content options",
    recycledContent: "60-90% stainless options",
    lifespan: "20+ years",
    certifications: ["Recycled content declarations", "EPD options"],
    stats: [
      { label: "Recycled steel", value: "60%+" },
      { label: "Recyclable", value: "Yes" },
      { label: "Life", value: "20+ yrs" },
    ],
    tradeoffs: "Choose verified recycled content and avoid short-life low-grade fixtures.",
    shop: [
      { label: "Elkay stainless sinks", url: "https://www.elkay.com/", region: "USA" },
      { label: "Franke sinks", url: "https://www.franke.com/", region: "Global" },
    ],
  },
  {
    id: "water-saving-fixtures",
    area: "Bathroom",
    usualMaterial: "Standard-flow fixtures",
    name: "Low-flow bathroom fixtures",
    category: "Water fixtures",
    fit: "Best for bathrooms, hospitality, and residential projects targeting water reduction.",
    sustainabilityScore: 83,
    embodiedCarbon: "Operational water and energy savings",
    carbonSaving: "Reduces hot water demand",
    recycledContent: "Brass/metal options vary",
    lifespan: "10-20 years",
    certifications: ["WaterSense", "LEED WE"],
    stats: [
      { label: "Water saving", value: "20-40%" },
      { label: "Hot water", value: "Lower" },
      { label: "LEED", value: "WE" },
    ],
    tradeoffs: "User comfort depends on pressure, aerator quality, and maintenance.",
    shop: [
      { label: "Kohler water-saving", url: "https://www.kohler.com/", region: "Global" },
      { label: "Jaquar water-saving", url: "https://www.jaquar.com/", region: "India" },
    ],
  },
  {
    id: "microcement-bathroom-finish",
    area: "Bathroom",
    usualMaterial: "Full-height new ceramic tile",
    name: "Low-VOC microcement overlay",
    category: "Bathroom finish",
    fit: "Best for renovations where existing tile can be covered instead of demolished.",
    sustainabilityScore: 78,
    embodiedCarbon: "Avoids demolition and replacement layers",
    carbonSaving: "Reduces waste in renovations",
    recycledContent: "Mineral-based, varies by supplier",
    lifespan: "10-20 years",
    certifications: ["Low VOC options", "Renovation waste reduction"],
    stats: [
      { label: "Waste avoided", value: "High" },
      { label: "VOC", value: "Low" },
      { label: "Thickness", value: "Thin" },
    ],
    tradeoffs: "Waterproofing, slip resistance, and installer skill are critical.",
    shop: [
      { label: "Topciment", url: "https://www.topciment.com/en", region: "Global" },
      { label: "Microcement suppliers", url: "https://www.indiamart.com/", region: "India marketplace" },
    ],
  },
];

export const scrapPartners: ScrapPartner[] = [
  {
    id: "saahas-bengaluru",
    name: "Saahas Zero Waste",
    type: "Recycler",
    city: "Bengaluru",
    accepts: ["wood", "metal", "plastic", "e-waste", "furniture"],
    distanceKm: 4.8,
    contact: "+91 080 4168 9889",
    url: "https://saahaszerowaste.com/",
    note: "Good first call for sorted renovation waste and responsible recycling.",
  },
  {
    id: "second-life-delhi",
    name: "Second Life Design Store",
    type: "Resale",
    city: "Delhi",
    accepts: ["furniture", "lighting", "doors", "fixtures"],
    distanceKm: 6.2,
    contact: "contact via website",
    url: "https://www.etsy.com/market/reclaimed_furniture",
    note: "Use for sellable furniture, fixtures, and salvage pieces.",
  },
  {
    id: "scrapq-mumbai",
    name: "ScrapQ Aggregator",
    type: "Scrapyard",
    city: "Mumbai",
    accepts: ["metal", "wood", "glass", "appliances", "fixtures"],
    distanceKm: 7.5,
    contact: "pickup request online",
    url: "https://www.scrapq.com/",
    note: "Useful for pickup-style scrap requests and mixed recyclable loads.",
  },
  {
    id: "habitat-restore",
    name: "Habitat ReStore",
    type: "Donation",
    city: "New York",
    accepts: ["furniture", "cabinetry", "doors", "windows", "fixtures"],
    distanceKm: 5.6,
    contact: "donation pickup online",
    url: "https://www.habitat.org/restores",
    note: "Donation route for reusable building products and home goods.",
  },
  {
    id: "earth911",
    name: "Earth911 Recycling Search",
    type: "Recycler",
    city: "Los Angeles",
    accepts: ["paint", "metal", "wood", "glass", "plastic", "fixtures"],
    distanceKm: 9.4,
    contact: "search by ZIP code",
    url: "https://search.earth911.com/",
    note: "Best for location-specific recycling options in the US.",
  },
  {
    id: "local-kabadi",
    name: "Verified Local Kabadi Network",
    type: "Scrapyard",
    city: "Pune",
    accepts: ["metal", "wood", "plastic", "glass", "appliances"],
    distanceKm: 3.1,
    contact: "call local listing",
    url: "https://www.justdial.com/",
    note: "Fastest option for commodity scrap with local pickup.",
  },
];

export function recommendForPlan(plan: string, selectedAreas: HouseArea[]) {
  const normalized = plan.toLowerCase();
  const areasFromText = materialAreas.filter((area) =>
    normalized.includes(area.toLowerCase())
  );

  const requestedAreas = selectedAreas.length > 0 ? selectedAreas : areasFromText;
  const fallbackAreas = requestedAreas.length > 0 ? requestedAreas : materialAreas.slice(0, 5);

  return greenMaterials
    .filter((material) => fallbackAreas.includes(material.area))
    .sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
}

export function findScrapPartners(location: string, item: string) {
  const normalizedLocation = location.trim().toLowerCase();
  const normalizedItem = item.trim().toLowerCase();

  return scrapPartners
    .filter((partner) => {
      const cityMatch =
        normalizedLocation.length === 0 ||
        partner.city.toLowerCase().includes(normalizedLocation) ||
        normalizedLocation.includes(partner.city.toLowerCase());
      const itemMatch =
        normalizedItem.length === 0 ||
        partner.accepts.some((accepted) => normalizedItem.includes(accepted));

      return cityMatch || itemMatch;
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
