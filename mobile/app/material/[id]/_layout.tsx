import { Slot, useLocalSearchParams } from "expo-router";
import { MaterialProvider } from "../../../src/context/MaterialContext";

export default function MaterialLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <MaterialProvider materialId={id}>
      <Slot />
    </MaterialProvider>
  );
}
