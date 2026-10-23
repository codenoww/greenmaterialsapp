import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Material } from "../types/material";
import { fetchMaterialById } from "../api/materials.api";
import { normalizeMaterial } from "../services/normalizeMaterial";

type MaterialState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; material: Material };

const MaterialContext = createContext<MaterialState | null>(
  null
);

export function useMaterial() {
  const ctx = useContext(MaterialContext);
  if (!ctx) {
    throw new Error(
      "useMaterial must be used within MaterialProvider"
    );
  }
  return ctx;
}

type Props = {
  materialId: string;
  children: React.ReactNode;
};

export function MaterialProvider({
  materialId,
  children,
}: Props) {
  const [state, setState] = useState<MaterialState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const apiMaterial = await fetchMaterialById(
          materialId
        );
        const material = normalizeMaterial(apiMaterial);

        if (!cancelled) {
          setState({ status: "ready", material });
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
  }, [materialId]);

  return (
    <MaterialContext.Provider value={state}>
      {children}
    </MaterialContext.Provider>
  );
}
