import styled from "@emotion/styled";
import type { ResultItemData } from "./mock_result";
import ItemSlot from "../../shared/ItemSlot";
import type { SlotHighlight } from "../../shared/slotStyle";

interface ResultItemProps {
  result: ResultItemData | null;
  highlight: SlotHighlight;
  onPick: () => void;
  onRemove: () => void;
  onDropItem: (name: string) => void;
  onOverChange: (isOver: boolean) => void;
}

export default function ResultItem({ result, ...slot }: ResultItemProps) {
  return (
    <Wrapper>
      <Slot
        {...slot}
        name={result?.name ?? null}
        emptyLabel="결과 아이템 칸"
        size={200}
        plusSize={20}
        imageAlt="결과 아이템"
      />
      <ItemInfo>
        <ItemName>{result?.name}</ItemName>
        <ItemDesc>{result?.description}</ItemDesc>
      </ItemInfo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  gap: 20px;
`;

const Slot = styled(ItemSlot)`
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const ItemName = styled.div`
  color: var(--brown-b3, #6f5e4c);
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
  margin-bottom: 4px;
`;

const ItemDesc = styled.div`
  color: var(--gray-600, #8e8889);

  /* body/body-small */
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;
