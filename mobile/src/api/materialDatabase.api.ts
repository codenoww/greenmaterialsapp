import { API_BASE_URL } from "./api";

export type MaterialDatabaseRecord = {
  id: string;
  section: string;
  name: string;
  category: string;
  usualMaterial: string;
  manufacturer?: string;
  region?: string;
  declaredUnit?: string;
  gwpA1A3?: {
    value: number;
    unit: string;
    source: string;
  };
  sustainabilityScore: number;
  recycledContent?: string;
  lifespan?: string;
  certifications: string[];
  healthAndCircularity: {
    lowVoc: boolean;
    bioBased: boolean;
    recyclable: boolean;
    reusePotential: "low" | "medium" | "high";
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
  metrics?: {
    carbonIntensity: {
      value: number;
      unit: string;
      source: string;
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
      stage: string;
      label: string;
      percent: number;
    }[];
    costCarbonModel: {
      relativeCost: "lower" | "similar" | "higher" | "varies";
      carbonValueNote: string;
    };
    comparableDesignOptions: string[];
  };
  sourceIds: string[];
};

export type MaterialDatabaseResponse = {
  items: MaterialDatabaseRecord[];
  mode: "verified_api_with_cache" | "local_cache_fallback";
  note: string;
};

export async function fetchMaterialDatabase(): Promise<MaterialDatabaseResponse> {
  const res = await fetch(`${API_BASE_URL}/material-database/materials?limit=200`);

  if (!res.ok) {
    throw new Error("Failed to fetch material database");
  }

  return res.json();
}
