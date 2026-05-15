export type MaterialSection =
  | 'Foundation'
  | 'Walls'
  | 'Roof'
  | 'Flooring'
  | 'Insulation'
  | 'Paint'
  | 'Windows'
  | 'Kitchen'
  | 'Bathroom';

export type MaterialSourceKind =
  | 'openepd_ec3'
  | 'ice_fallback'
  | 'mindful_framework'
  | 'curated_supplier';

export type MaterialDatabaseSource = {
  id: MaterialSourceKind;
  name: string;
  purpose: string;
  url: string;
  access: 'api_token_required' | 'public_reference' | 'local_curated';
};

export type MaterialImpactRecord = {
  id: string;
  section: MaterialSection;
  name: string;
  category: string;
  usualMaterial: string;
  manufacturer?: string;
  region?: string;
  declaredUnit?: string;
  gwpA1A3?: {
    value: number;
    unit: string;
    source: MaterialSourceKind;
  };
  sustainabilityScore: number;
  recycledContent?: string;
  lifespan?: string;
  certifications: string[];
  healthAndCircularity: {
    lowVoc: boolean;
    bioBased: boolean;
    recyclable: boolean;
    reusePotential: 'low' | 'medium' | 'high';
  };
  specSheet: {
    application: string;
    composition: string;
    performanceNotes: string;
    tradeoffs: string;
  };
  shopLinks: {
    label: string;
    url: string;
    region: string;
  }[];
  metrics?: MaterialImpactMetrics;
  sourceIds: MaterialSourceKind[];
};

export type MaterialImpactMetrics = {
  carbonIntensity: {
    value: number;
    unit: string;
    source: MaterialSourceKind;
  };
  baselineCarbonIntensity: {
    value: number;
    unit: string;
    material: string;
  };
  carbonSavingsPercent: number;
  defaultQuantity: {
    value: number;
    unit: string;
    note: string;
  };
  estimatedProjectImpact: {
    recommendedKgCO2e: number;
    baselineKgCO2e: number;
    savingsKgCO2e: number;
  };
  impactBreakdown: {
    stage: 'A1-A3' | 'A4' | 'B' | 'C' | 'D';
    label: string;
    percent: number;
  }[];
  costCarbonModel: {
    relativeCost: 'lower' | 'similar' | 'higher' | 'varies';
    carbonValueNote: string;
  };
  comparableDesignOptions: string[];
};

export type MaterialDatabaseQuery = {
  q?: string;
  section?: MaterialSection;
  limit?: number;
};
