import { API_BASE_URL } from './api';

export type Recommendation = {
  materialId: string;
  name: string;
  category: string;
  matchScore: number;
  whyRecommended: string[];
  potentialLeedCredits: {
    code: string;
    name: string;
    category: string;
  }[];
  disclaimer: string;
};

export type RecommendationsResponse = {
  query: string;
  recommendations: Recommendation[];
  aiInsight: {
    summary: string;
    materialNotes: Record<string, string>;
  };
};

export async function fetchRecommendations(
  query: string
): Promise<RecommendationsResponse> {
  const res = await fetch(
    `${API_BASE_URL}/recommendations?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  return res.json();
}
