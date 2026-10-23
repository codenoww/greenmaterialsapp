// mobile/services/api.ts

// Android emulator → 10.0.2.2
// iOS simulator → localhost
const API_BASE_URL = 'http://10.0.2.2:3000';

/**
 * Fetch all materials
 */
export async function fetchMaterials() {
  const res = await fetch(`${API_BASE_URL}/materials`);

  if (!res.ok) {
    throw new Error('Failed to fetch materials');
  }

  return res.json();
}

/**
 * Fetch LEED insights for a specific material
 */
export async function fetchLeedInsights(materialId: string) {
  const res = await fetch(
    `${API_BASE_URL}/materials/${materialId}/leed`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch LEED insights');
  }

  return res.json();
}

/**
 * Fetch material recommendations based on design description
 */
export async function fetchRecommendations(
  designDescription: string,
) {
  const res = await fetch(
    `${API_BASE_URL}/recommendations`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        designDescription,
      }),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  return res.json();
}
