import styled from "@emotion/styled";
import Image from "next/image";
import type { InventoryItem } from "@/src/entities/item/model/types";

interface ItemSlotsProps {
  slots: (InventoryItem | null)[];
  onSlotClick: (index: number) => void;
  onRemove: (index: number) => void;
}

export default function ItemSlots({
  slots,
  onSlotClick,
  onRemove,
}: ItemSlotsProps) {
  return (
    <ImageWrapper>
      {slots.map((item, index) => (
        <SlotWrapper key={index}>
          <Slot
            type="button"
            aria-label={item ? item.name : `${index + 1}번 재료 선택`}
            onClick={() => onSlotClick(index)}
          >
            {item && (
              <Image
                src={"/tempImg/tempItemImg.png"}
                width={100}
                height={100}
                alt={item.name}
              />
            )}
          </Slot>
          {item && (
            <DeleteButton
              type="button"
              aria-label={`${item.name} 빼기`}
              onClick={() => onRemove(index)}
            >
              <Image
                src={"/icon/deleteIcon/icon/UI_actions/close.svg"}
                width={24}
                height={24}
                alt=""
              />
            </DeleteButton>
          )}
        </SlotWrapper>
      ))}
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
  margin-top: 24px;
`;

const SlotWrapper = styled.div`
  position: relative;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Slot = styled.button`
  display: flex;
  width: 100px;
  height: 100px;
  padding: 0;
  border: 2px solid var(--gray-400, #d0cccc);
  background: #fff;
  cursor: pointer;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
`;
