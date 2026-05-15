import {
  MaterialDatabaseSource,
  MaterialImpactRecord,
} from './material-database.types';

export const materialSources: MaterialDatabaseSource[] = [
  {
    id: 'openepd_ec3',
    name: 'OpenEPD / EC3',
    purpose:
      'Product-specific verified Environmental Product Declaration records, including GWP and declared unit where API access is available.',
    url: 'https://www.buildingtransparency.org/tools/ec3/',
    access: 'api_token_required',
  },
  {
    id: 'ice_fallback',
    name: 'Inventory of Carbon and Energy',
    purpose:
      'Generic embodied carbon fallback factors when product-specific EPD data is missing.',
    url: 'https://globalabc.org/sustainable-materials-hub/resources/inventory-carbon-and-energy-ice-database',
    access: 'public_reference',
  },
  {
    id: 'mindful_framework',
    name: 'mindful MATERIALS Common Materials Framework',
    purpose:
      'Scoring categories beyond carbon, including health, circularity, ecosystem, and social impact.',
    url: 'https://www.mindfulmaterials.com/data-ecosystem',
    access: 'public_reference',
  },
  {
    id: 'curated_supplier',
    name: 'Curated supplier links',
    purpose:
      'Shopping and procurement links because EPD databases do not consistently include retail purchase URLs.',
    url: 'https://www.greenbuildingsupply.com/',
    access: 'local_curated',
  },
];

export const localMaterialCache: MaterialImpactRecord[] = [
  {
    id: 'low-carbon-concrete',
    section: 'Foundation',
    name: 'GGBS / fly-ash low-carbon concrete',
    category: 'Structural concrete',
    usualMaterial: 'Portland cement concrete',
    manufacturer: 'Varies by ready-mix supplier',
    region: 'Global',
    declaredUnit: 'm3',
    gwpA1A3: { value: 220, unit: 'kgCO2e/m3', source: 'ice_fallback' },
    sustainabilityScore: 91,
    recycledContent: '25-60% cement replacement',
    lifespan: '50+ years',
    certifications: ['EPD-ready', 'LEED MR', 'IGBC MR'],
    healthAndCircularity: {
      lowVoc: true,
      bioBased: false,
      recyclable: true,
      reusePotential: 'medium',
    },
    specSheet: {
      application: 'Slabs, footings, and structural concrete pours.',
      composition: 'Cement, aggregate, water, fly ash or GGBS supplementary cementitious material.',
      performanceNotes:
        'Engineer should approve mix design, strength class, curing time, and exposure class.',
      tradeoffs:
        'May require longer curing and early supplier coordination compared with standard concrete.',
    },
    shopLinks: [
      {
        label: 'Holcim ECOPact',
        url: 'https://www.holcim.com/what-we-do/ready-mix-concrete/ecopact',
        region: 'Global',
      },
    ],
    sourceIds: ['openepd_ec3', 'ice_fallback', 'mindful_framework'],
  },
  {
    id: 'cseb-blocks',
    section: 'Walls',
    name: 'Compressed stabilized earth blocks',
    category: 'Walling',
    usualMaterial: 'Burnt clay brick',
    region: 'India / Global',
    declaredUnit: 'm3',
    gwpA1A3: { value: 65, unit: 'kgCO2e/m3', source: 'ice_fallback' },
    sustainabilityScore: 88,
    recycledContent: 'Local soil with low cement stabilization',
    lifespan: '40+ years',
    certifications: ['Local material credit', 'Low-energy production'],
    healthAndCircularity: {
      lowVoc: true,
      bioBased: false,
      recyclable: true,
      reusePotential: 'high',
    },
    specSheet: {
      application: 'Non-load-bearing and low-rise wall systems after soil testing.',
      composition: 'Local earth, sand, stabilizer, and water compressed into blocks.',
      performanceNotes:
        'Thermal mass is strong; moisture detailing and block quality control are critical.',
      tradeoffs:
        'Needs trained masons, local testing, and protection from prolonged moisture exposure.',
    },
    shopLinks: [
      {
        label: 'Auroville Earth Institute',
        url: 'https://www.earth-auroville.com/',
        region: 'India',
      },
    ],
    sourceIds: ['ice_fallback', 'mindful_framework', 'curated_supplier'],
  },
  {
    id: 'cellulose-insulation',
    section: 'Insulation',
    name: 'Recycled cellulose insulation',
    category: 'Thermal insulation',
    usualMaterial: 'Foam board or fiberglass',
    manufacturer: 'Varies by supplier',
    region: 'Global',
    declaredUnit: 'm2 at target R-value',
    sustainabilityScore: 93,
    recycledContent: '70-90% recycled paper',
    lifespan: '30+ years',
    certifications: ['GREENGUARD options', 'LEED MR', 'Low VOC'],
    healthAndCircularity: {
      lowVoc: true,
      bioBased: true,
      recyclable: false,
      reusePotential: 'low',
    },
    specSheet: {
      application: 'Walls, attics, and retrofit cavities.',
      composition: 'Recycled paper fiber with borate fire and pest treatment.',
      performanceNotes:
        'Dense-pack installation improves air sealing and thermal performance.',
      tradeoffs:
        'Moisture control and installer quality have a large effect on performance.',
    },
    shopLinks: [
      {
        label: 'Greenfiber',
        url: 'https://www.greenfiber.com/',
        region: 'USA',
      },
    ],
    sourceIds: ['openepd_ec3', 'ice_fallback', 'mindful_framework'],
  },
  {
    id: 'fsc-bamboo-flooring',
    section: 'Flooring',
    name: 'FSC bamboo flooring',
    category: 'Flooring',
    usualMaterial: 'Virgin hardwood or vitrified tile',
    region: 'Global',
    declaredUnit: 'm2',
    sustainabilityScore: 86,
    recycledContent: 'Rapidly renewable bio-based material',
    lifespan: '20-30 years',
    certifications: ['FSC', 'FloorScore', 'LEED MR/EQ'],
    healthAndCircularity: {
      lowVoc: true,
      bioBased: true,
      recyclable: false,
      reusePotential: 'medium',
    },
    specSheet: {
      application: 'Dry interior flooring where a warm, renewable finish is desired.',
      composition: 'Laminated bamboo strips with adhesive and factory finish.',
      performanceNotes:
        'Specify low-formaldehyde adhesives and verified indoor air certificates.',
      tradeoffs: 'Not ideal for wet spaces; adhesive chemistry varies across products.',
    },
    shopLinks: [
      {
        label: 'Cali Bamboo',
        url: 'https://www.calibamboo.com/',
        region: 'USA',
      },
    ],
    sourceIds: ['openepd_ec3', 'mindful_framework', 'curated_supplier'],
  },
  {
    id: 'low-voc-paint',
    section: 'Paint',
    name: 'Zero / low-VOC interior paint',
    category: 'Finishes',
    usualMaterial: 'Conventional acrylic paint',
    region: 'Global',
    declaredUnit: 'liter',
    sustainabilityScore: 89,
    recycledContent: 'Varies',
    lifespan: '6-10 years',
    certifications: ['Green Seal', 'GREENGUARD', 'LEED EQ'],
    healthAndCircularity: {
      lowVoc: true,
      bioBased: false,
      recyclable: false,
      reusePotential: 'low',
    },
    specSheet: {
      application: 'Interior walls, ceilings, schools, healthcare, and occupied renovations.',
      composition: 'Water-based acrylic or mineral paint with low VOC emissions.',
      performanceNotes:
        'Check VOC after tinting, washability, and emissions certification.',
      tradeoffs:
        'Some low-VOC paints still vary in durability and additive chemistry.',
    },
    shopLinks: [
      {
        label: 'Asian Paints Royale Health Shield',
        url: 'https://www.asianpaints.com/products/paints-and-textures/interior-walls/royale-health-shield.html',
        region: 'India',
      },
    ],
    sourceIds: ['openepd_ec3', 'mindful_framework', 'curated_supplier'],
  },
];
