import type { DragEvent } from "react";
import { ITEM_DRAG_TYPE } from "./dragType";

export function useItemDrop(
  onDropItem: (name: string) => void,
  onOverChange: (isOver: boolean) => void,
) {
  return {
    onDragOver: (e: DragEvent<HTMLElement>) => {
      if (!e.dataTransfer.types.includes(ITEM_DRAG_TYPE)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      onOverChange(true);
    },
    onDragLeave: (e: DragEvent<HTMLElement>) => {
      if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
      onOverChange(false);
    },
    onDrop: (e: DragEvent<HTMLElement>) => {
      if (!e.dataTransfer.types.includes(ITEM_DRAG_TYPE)) return;
      e.preventDefault();
      onOverChange(false);
      const dropped = e.dataTransfer.getData(ITEM_DRAG_TYPE);
      if (dropped) onDropItem(dropped);
    },
  };
}
