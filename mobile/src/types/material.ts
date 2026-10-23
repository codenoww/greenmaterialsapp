// mobile/src/types/material.ts
export type Material = {
  id: string;
  name: string;
  category: string;
  description: string;

  sustainability: {
    summary: string;
    benefits: string[];
  };

  leed: {
    points: number;
    credits: string[];
  };

  specs: Record<string, string | number>;
};
