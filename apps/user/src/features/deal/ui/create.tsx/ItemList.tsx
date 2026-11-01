"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import type { InventoryItem } from "@/src/entities/item/model/types";

interface ItemListProps {
  items: InventoryItem[];
  isSheetOpen: boolean;
  maxCount: number;
  onOpenPicker: () => void;
  onRemove: (index: number) => void;
}

export default function ItemList({
  items,
  isSheetOpen,
  maxCount,
  onOpenPicker,
  onRemove,
}: ItemListProps) {
  return (
    <InputItems onClick={onOpenPicker}>
      {items.map((item, index) => (
        <SelectedItem
          key={`${item.id}-${index}`}
          as={isSheetOpen ? "button" : "div"}
          type={isSheetOpen ? "button" : undefined}
          aria-label={isSheetOpen ? `${item.name} 빼기` : undefined}
          onClick={
            isSheetOpen
              ? (event) => {
                  event.stopPropagation();
                  onRemove(index);
                }
              : undefined
          }
          $isRemovable={isSheetOpen}
        >
          <Image src="/tempImg/tempItemImg.png" width={50} height={50} alt="" />
        </SelectedItem>
      ))}
      {items.length < maxCount && (
        <AddButton type="button" aria-label="아이템 추가">
          <Image src="/img/addImg.svg" width={50} height={50} alt="" />
        </AddButton>
      )}
    </InputItems>
  );
}

const InputItems = styled.div`
  position: relative;
  z-index: 101;
  display: grid;
  grid-template-columns: repeat(5, 50px);
  align-content: start;
  min-height: 74px;
  cursor: pointer;
  padding: var(--space-20, 20px) 27px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: var(--radius-md, 12px);
  background: #fff;
  border: #fff;
`;

const AddButton = styled.button`
  display: flex;
  padding: 0;
  flex-shrink: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const SelectedItem = styled.button<{ $isRemovable: boolean }>`
  display: flex;
  padding: 0;
  flex-shrink: 0;
  border: none;
  background: transparent;
  cursor: ${({ $isRemovable }) => ($isRemovable ? "pointer" : "default")};
  -webkit-tap-highlight-color: transparent;
`;
