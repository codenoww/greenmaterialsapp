export type MaterialSummary = {
  id: string;
  name: string;
  category: string;
  carbonLevel: "low" | "medium" | "high";
  leedPoints: number;
};
