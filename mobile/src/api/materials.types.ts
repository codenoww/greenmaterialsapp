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
  items: {
    id: string;
    name: string;
    category: string;
    description?: string;
    carbonLevel?: "low" | "medium" | "high";
    leedPoints?: number;
  }[];
};

