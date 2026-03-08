import { MaterialsListApiResponse } from "../api/materials.types";
import { MaterialSummary } from "../types/materialSummary";

export function normalizeMaterialSummary(
  dto: MaterialsListApiResponse["items"][number]
): MaterialSummary {
  return {
    id: dto.id,
    name: dto.name,
    category: dto.category,
    carbonLevel: dto.carbonLevel,
    leedPoints: dto.leedPoints,
  };
}
