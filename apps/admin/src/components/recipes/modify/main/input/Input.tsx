import styled from "@emotion/styled";
import ItemSlot from "../../shared/ItemSlot";
import type { SlotHighlight } from "../../shared/slotStyle";

interface InputProps {
  name: string | null;
  index: number;
  highlight: SlotHighlight;
  onPick: () => void;
  onRemove: () => void;
  onDropItem: (name: string) => void;
  onOverChange: (isOver: boolean) => void;
}

export default function Input({ name, index, ...slot }: InputProps) {
  return (
    <Wrapper>
      <ItemSlot
        {...slot}
        name={name}
        emptyLabel={`${index + 1}번 재료 칸`}
        size={136}
        imageAlt=""
      />
      <ItemName>{name}</ItemName>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  width: 136px;
`;

const ItemName = styled.div`
  min-height: 15px;
  max-width: 100%;
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "Cafe24 Ssurround";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
`;
