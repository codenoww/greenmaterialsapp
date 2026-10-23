import {
  MaterialApiResponse,
  MaterialsListApiResponse,
} from "./materials.types";
import { API_BASE_URL } from "./api";

export async function fetchMaterialById(
  id: string
): Promise<MaterialApiResponse> {
  const res = await fetch(`${API_BASE_URL}/materials/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch material");
  }

  return res.json();
}

export async function fetchMaterials(): Promise<MaterialsListApiResponse> {
  const res = await fetch(`${API_BASE_URL}/materials`);

  if (!res.ok) {
    throw new Error("Failed to fetch materials");
  }

  const data = await res.json();

  return Array.isArray(data) ? { items: data } : data;
}
