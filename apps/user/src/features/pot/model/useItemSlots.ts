"use client";

import { useState } from "react";
import type { InventoryItem } from "@/src/entities/item/model/types";

type Slots = (InventoryItem | null)[];

const DEFAULT_SLOT_COUNT = 3;

const getFillOrder = (start: number, slotCount: number) => [
  start,
  ...Array.from({ length: slotCount }, (_, i) => i).filter((i) => i !== start),
];

export function useItemSlots(slotCount = DEFAULT_SLOT_COUNT) {
  const [slots, setSlots] = useState<Slots>(() => Array(slotCount).fill(null));
  const [fillOrder, setFillOrder] = useState<number[] | null>(null);

  const openPicker = (index: number) => {
    if (slots[index] !== null) return;

    setFillOrder(getFillOrder(index, slotCount));
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

  const clearAllSlots = () => setSlots(Array(slotCount).fill(null));

  const selectedItems = slots.filter((slot): slot is InventoryItem => !!slot);

  const isFull = selectedItems.length === slotCount;

  return {
    slots,
    selectedItems,
    isFull,
    isPickerOpen: fillOrder !== null,
    openPicker,
    closePicker,
    fillSlot,
    clearSlot,
    clearAllSlots,
  };
}
