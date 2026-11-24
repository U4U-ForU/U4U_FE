import styled from "@emotion/styled";
import Image from "next/image";
import PlusIcon from "@/src/shared/ui/PlusIcon";
import type { InventoryItem } from "@/src/entities/item/model/types";
import {
  IDLE_BACKGROUND,
  IDLE_BORDER_COLOR,
  IDLE_COLOR,
  NEXT_BACKGROUND,
  NEXT_COLOR,
} from "@/src/shared/ui/slotStyle";

interface ItemInputProps {
  item: InventoryItem | null;
  index: number;
  isTarget: boolean;
  onClick: () => void;
  onRemove: () => void;
}

export default function ItemInput({
  item,
  index,
  isTarget,
  onClick,
  onRemove,
}: ItemInputProps) {
  return (
    <SlotWrapper>
      <Wrapper
        type="button"
        aria-label={item ? item.name : `${index + 1}번 아이템 추가`}
        onClick={onClick}
        disabled={item !== null}
        $target={isTarget}
      >
        {item ? (
          <Image
            src={"/tempImg/tempItemImg.png"}
            width={160}
            height={160}
            alt={item.name}
          />
        ) : (
          <PlusIcon size={24} />
        )}
      </Wrapper>
      {item && (
        <DeleteButton
          type="button"
          aria-label={`${item.name} 빼기`}
          onClick={onRemove}
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
  );
}

const SlotWrapper = styled.div`
  position: relative;
`;

const Wrapper = styled.button<{ $target: boolean }>`
  display: flex;
  width: 160px;
  height: 160px;
  padding: 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  border-radius: var(--radius-sm, 6px);
  border: 1px dashed
    ${({ $target }) => ($target ? NEXT_COLOR : IDLE_BORDER_COLOR)};
  background: ${({ $target }) => ($target ? NEXT_BACKGROUND : IDLE_BACKGROUND)};
  color: ${({ $target }) => ($target ? NEXT_COLOR : IDLE_COLOR)};
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
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
`;
