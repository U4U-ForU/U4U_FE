import type { DragEvent } from "react";
import ItemCard from "@/src/components/shared/ItemCard";
import { ITEM_DRAG_TYPE } from "../shared/dragType";

interface InventoryItemProps {
  name: string;
  onSelect: (name: string) => void;
}

export default function InventoryItem({ name, onSelect }: InventoryItemProps) {
  return (
    <ItemCard
      name={name}
      imageSize={68}
      width={92}
      height={103}
      draggable
      onDragStart={(e: DragEvent<HTMLButtonElement>) => {
        e.dataTransfer.setData(ITEM_DRAG_TYPE, name);
        e.dataTransfer.effectAllowed = "copy";
      }}
      onClick={() => onSelect(name)}
      aria-label={`재료 ${name} 추가`}
    />
  );
}
