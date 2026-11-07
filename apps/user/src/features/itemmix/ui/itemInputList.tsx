import styled from "@emotion/styled";
import ItemInput from "./ItemInput";
import type { InventoryItem } from "@/src/entities/item/model/types";

interface ItemInputListProps {
  slots: (InventoryItem | null)[];
  onSlotClick: (index: number) => void;
  onRemove: (index: number) => void;
}

export default function ItemInputList({
  slots,
  onSlotClick,
  onRemove,
}: ItemInputListProps) {
  return (
    <Wrapper>
      <InputList>
        {slots.map((item, index) => (
          <ItemInput
            key={index}
            item={item}
            index={index}
            onClick={() => onSlotClick(index)}
            onRemove={() => onRemove(index)}
          />
        ))}
      </InputList>
      <Info>같은 아이템도 여러 번 넣을 수 있어요</Info>
    </Wrapper>
  );
}

const Info = styled.div`
  color: var(--gray-600, #8e8889);
  text-align: center;

  /* body/body-xsmall */
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  margin-top: 8px;
`;

const Wrapper = styled.div`
  margin-top: 45px;
`;

const InputList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 160px);
  justify-content: center;
  gap: 20px;
`;
