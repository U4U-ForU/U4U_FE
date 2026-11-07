import styled from "@emotion/styled";
import Image from "next/image";
import type { InventoryItem } from "@/src/entities/item/model/types";

interface ItemInputProps {
  item: InventoryItem | null;
  index: number;
  onClick: () => void;
  onRemove: () => void;
}

export default function ItemInput({
  item,
  index,
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
      >
        {item ? (
          <Image
            src={"/tempImg/tempItemImg.png"}
            width={160}
            height={160}
            alt={item.name}
          />
        ) : (
          <Image src={"/icon/plus.svg"} width={24} height={24} alt="" />
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

const Wrapper = styled.button`
  display: flex;
  width: 160px;
  height: 160px;
  padding: 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  border-radius: var(--radius-sm, 6px);
  border: 1px dashed var(--gray-400, #d0cccc);
  background: rgba(255, 255, 255, 0.45);
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
