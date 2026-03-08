import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { fetchMaterials } from "../api/materials.api";
import { normalizeMaterialSummary } from "../services/normalizeMaterialSummary";
import { MaterialSummary } from "../types/materialSummary";

type MaterialsListState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; materials: MaterialSummary[] };

const MaterialsListContext =
  createContext<MaterialsListState | null>(null);

export function useMaterialsList(): MaterialsListState {
  const ctx = useContext(MaterialsListContext);
  if (!ctx) {
    throw new Error(
      "useMaterialsList must be used within MaterialsListProvider"
    );
  }
  return ctx;
}

type Props = {
  children: React.ReactNode;
};

export function MaterialsListProvider({ children }: Props) {
  const [state, setState] = useState<MaterialsListState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetchMaterials();

        const materials = response.items.map(
          normalizeMaterialSummary
        );

        if (!cancelled) {
          setState({
            status: "ready",
            materials,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            status: "error",
            error:
              err instanceof Error
                ? err.message
                : "Unknown error",
          });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MaterialsListContext.Provider value={state}>
      {children}
    </MaterialsListContext.Provider>
  );
}
