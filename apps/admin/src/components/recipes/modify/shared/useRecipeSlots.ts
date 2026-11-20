import { useCallback, useEffect, useState } from "react";
import type { ResultItemData } from "../main/result/mock_result";
import type { SlotHighlight } from "./slotStyle";

export const SLOT_COUNT = 3;

export type Target = "result" | number;

export function useRecipeSlots(
  initialResult: ResultItemData | null = null,
  initialIngredients: readonly string[] = [],
  slotCount: number = SLOT_COUNT,
) {
  const [result, setResult] = useState<ResultItemData | null>(initialResult);
  const [slots, setSlots] = useState<(string | null)[]>(() =>
    Array.from(
      { length: slotCount },
      (_, index) => initialIngredients[index] ?? null,
    ),
  );
  const [pickedTarget, setPickedTarget] = useState<Target | null>(null);
  const [overTarget, setOverTarget] = useState<Target | null>(null);

  useEffect(() => {
    const clear = () => setOverTarget(null);
    window.addEventListener("dragend", clear);
    return () => window.removeEventListener("dragend", clear);
  }, []);

  const isEmptyTarget = (target: Target | null) =>
    target === "result"
      ? result === null
      : typeof target === "number" && slots[target] === null;

  const fillOrder: Target[] = ["result", ...slots.map((_, index) => index)];

  const target: Target | null = isEmptyTarget(pickedTarget)
    ? pickedTarget
    : (fillOrder.find(isEmptyTarget) ?? null);

  const highlightOf = (position: Target): SlotHighlight => {
    if (overTarget !== null) return overTarget === position ? "over" : "none";
    return target === position ? "target" : "none";
  };

  const setOver = useCallback((position: Target, isOver: boolean) => {
    setOverTarget((prev) =>
      isOver ? position : prev === position ? null : prev,
    );
  }, []);

  const setResultName = useCallback(
    (name: string) => setResult({ name, description: "" }),
    [],
  );

  const removeResult = useCallback(() => setResult(null), []);

  const setItemAt = useCallback((index: number, name: string) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = name;
      return next;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  const addItem = useCallback(
    (name: string) => {
      if (target === null) return;
      if (target === "result") setResultName(name);
      else setItemAt(target, name);
      setPickedTarget(null);
    },
    [target, setResultName, setItemAt],
  );

  return {
    result,
    slots,
    canSubmit: result !== null && slots.every((name) => name !== null),
    resultHighlight: highlightOf("result"),
    slotHighlights: slots.map((_, index) => highlightOf(index)),
    pickTarget: setPickedTarget,
    setOver,
    addItem,
    setResultName,
    removeResult,
    setItemAt,
    removeItem,
  };
}
