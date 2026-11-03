"use client";

import { useState } from "react";
import type { InventoryItem } from "@/src/entities/item/model/types";

type Slots = (InventoryItem | null)[];

const SLOT_COUNT = 3;

const getFillOrder = (start: number) => [
  start,
  ...Array.from({ length: SLOT_COUNT }, (_, i) => i).filter((i) => i !== start),
];

export function useItemSlots() {
  const [slots, setSlots] = useState<Slots>(Array(SLOT_COUNT).fill(null));
  const [fillOrder, setFillOrder] = useState<number[] | null>(null);

  const openPicker = (index: number) => {
    if (slots[index] !== null) return;

    setFillOrder(getFillOrder(index));
  };

  const closePicker = () => setFillOrder(null);

  const fillSlot = (item: InventoryItem) => {
    if (!fillOrder) return;

    const target = fillOrder.find((i) => slots[i] === null);

    if (target === undefined) return;

    const next = slots.map((slot, i) => (i === target ? item : slot));

    setSlots(next);

    if (next.every((slot) => slot !== null)) closePicker();
  };

  const clearSlot = (index: number) =>
    setSlots((prev) => prev.map((slot, i) => (i === index ? null : slot)));

  const selectedItems = slots.filter((slot): slot is InventoryItem => !!slot);

  const canRecombine = selectedItems.length === SLOT_COUNT;

  return {
    slots,
    selectedItems,
    canRecombine,
    isPickerOpen: fillOrder !== null,
    openPicker,
    closePicker,
    fillSlot,
    clearSlot,
  };
}
