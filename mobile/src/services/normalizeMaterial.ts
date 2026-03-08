// mobile/src/services/normalizeMaterial.ts
import { MaterialApiResponse } from "../api/materials.types";
import { Material } from "../types/material";

export function normalizeMaterial(
  api: MaterialApiResponse
): Material {
  const specs: Record<string, string | number> = {};

  if (api.specs) {
    for (const [key, value] of Object.entries(api.specs)) {
      if (
        typeof value === "string" ||
        typeof value === "number"
      ) {
        specs[key] = value;
      }
    }
  }

  return {
    id: api.id,
    name: api.name,
    category: api.category,
    description: api.description,

    sustainability: {
      summary: api.sustainability?.summary ?? "",
      benefits: api.sustainability?.benefits ?? [],
    },

    leed: {
      points: api.leedCredits?.points ?? 0,
      credits: api.leedCredits?.credits ?? [],
    },

    specs,
  };
}
