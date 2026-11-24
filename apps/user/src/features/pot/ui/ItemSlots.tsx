import styled from "@emotion/styled";
import Image from "next/image";
import PlusIcon from "./PlusIcon";
import type { InventoryItem } from "@/src/entities/item/model/types";

const NEXT_COLOR = "#a75959";
const NEXT_BACKGROUND = "rgba(255, 208, 208, 0.25)";
const IDLE_COLOR = "var(--gray-600, #8e8889)";
const IDLE_BORDER_COLOR = "var(--gray-400, #d0cccc)";
const IDLE_BACKGROUND = "rgba(255, 255, 255, 0.45)";

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
  const targetIndex = slots.findIndex((item) => item === null);

  return (
    <ImageWrapper>
      {slots.map((item, index) => (
        <SlotWrapper key={index}>
          <Slot
            type="button"
            aria-label={item ? item.name : `${index + 1}번 재료 선택`}
            onClick={() => onSlotClick(index)}
            disabled={item !== null}
            $filled={item !== null}
            $target={index === targetIndex}
          >
            {item ? (
              <Image
                src={"/tempImg/tempItemImg.png"}
                width={100}
                height={100}
                alt={item.name}
              />
            ) : (
              <PlusIcon />
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

const Slot = styled.button<{ $filled: boolean; $target: boolean }>`
  display: flex;
  width: 100px;
  height: 100px;
  padding: 0;
  justify-content: center;
  align-items: center;
  border: ${({ $filled, $target }) =>
    $filled
      ? `2px solid ${IDLE_BORDER_COLOR}`
      : `1px dashed ${$target ? NEXT_COLOR : IDLE_BORDER_COLOR}`};
  border-radius: ${({ $filled }) => ($filled ? "0" : "var(--radius-sm, 6px)")};
  background: ${({ $filled, $target }) => {
    if ($filled) return "#fff";

    return $target ? NEXT_BACKGROUND : IDLE_BACKGROUND;
  }};
  color: ${({ $target }) => ($target ? NEXT_COLOR : IDLE_COLOR)};
  cursor: pointer;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    cursor: default;
  }
`;
