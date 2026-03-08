// mobile/src/api/materials.types.ts
export type MaterialApiResponse = {
  id: string;
  name: string;
  category: string;
  description: string;

  sustainability?: {
    summary?: string;
    benefits?: string[];
  };

  leedCredits?: {
    points?: number;
    credits?: string[];
  };

  specs?: Record<string, unknown>;
};

export type MaterialsListApiResponse = {
  items: Array<{
    id: string;
    name: string;
    category: string;
    carbonLevel: "low" | "medium" | "high";
    leedPoints: number;
  }>;
};

