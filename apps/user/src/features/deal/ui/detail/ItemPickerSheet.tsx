"use client";

import styled from "@emotion/styled";
import BottomSheet from "@/src/shared/ui/BottomSheet";
import Item from "@/src/entities/item/ui/Item";
import { MOCK_ITEMS } from "@/src/entities/item/model/mockItems";
import type { InventoryItem } from "@/src/entities/item/model/types";
import Image from "next/image";

interface ItemPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: InventoryItem) => void;
  selectedItems: InventoryItem[];
  onExpandedChange?: (isExpanded: boolean) => void;
}

export default function ItemPickerSheet({
  isOpen,
  onClose,
  onSelect,
  selectedItems,
  onExpandedChange,
}: ItemPickerSheetProps) {
  const pickedCountById = selectedItems.reduce<Record<number, number>>(
    (acc, item) => ({ ...acc, [item.id]: (acc[item.id] ?? 0) + 1 }),
    {},
  );

  const getRemainingCount = (item: InventoryItem) =>
    (item.count ?? 1) - (pickedCountById[item.id] ?? 0);

  const availableItems = MOCK_ITEMS.filter(
    (item) => getRemainingCount(item) > 0,
  );

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      onExpandedChange={onExpandedChange}
    >
      <Top>
        <Status>{selectedItems.length}개 선택됨</Status>
        <CloseButton type="button" aria-label="닫기" onClick={onClose}>
          <Image
            src={"/icon/cancelButton/Vector.svg"}
            width={12}
            height={12}
            alt=""
          />
        </CloseButton>
      </Top>
      <ListBox>
        {availableItems.map((item) => (
          <Item
            key={item.id}
            itemName={item.name}
            itemCount={
              item.count === undefined ? undefined : getRemainingCount(item)
            }
            onClick={() => onSelect(item)}
          />
        ))}
      </ListBox>
    </BottomSheet>
  );
}

const CloseButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 20px 16px 20px;
`;

const Status = styled.div`
  color: var(--gray-700, #504a4c);

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const ListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 20px calc(20px + env(safe-area-inset-bottom));
  justify-items: center;
`;
