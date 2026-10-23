import { MaterialsListApiResponse } from "../api/materials.types";
import { MaterialSummary } from "../types/materialSummary";

export function normalizeMaterialSummary(
  dto: MaterialsListApiResponse["items"][number]
): MaterialSummary {
  const name = dto.name.toLowerCase();
  const category = dto.category.toLowerCase();

  const inferredCarbonLevel =
    dto.carbonLevel ??
    (name.includes("concrete") || category.includes("masonry")
      ? "medium"
      : "low");

  const inferredLeedPoints =
    dto.leedPoints ??
    (name.includes("paint")
      ? 1
      : name.includes("brick") || name.includes("bamboo")
        ? 2
        : 1);

  return {
    id: dto.id,
    name: dto.name,
    category: dto.category,
    carbonLevel: inferredCarbonLevel,
    leedPoints: inferredLeedPoints,
  };
}
