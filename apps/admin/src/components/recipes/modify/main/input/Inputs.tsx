import styled from "@emotion/styled";
import Input from "./Input";
import type { SlotHighlight } from "../../shared/slotStyle";

interface InputsProps {
  slots: (string | null)[];
  highlights: SlotHighlight[];
  onPick: (index: number) => void;
  onRemove: (index: number) => void;
  onDropItem: (index: number, name: string) => void;
  onOverChange: (index: number, isOver: boolean) => void;
}

export default function Inputs({
  slots,
  highlights,
  onPick,
  onRemove,
  onDropItem,
  onOverChange,
}: InputsProps) {
  return (
    <Wrapper>
      {slots.map((name, idx) => (
        <Input
          key={idx}
          name={name}
          index={idx}
          highlight={highlights[idx]}
          onPick={() => onPick(idx)}
          onRemove={() => onRemove(idx)}
          onDropItem={(dropped) => onDropItem(idx, dropped)}
          onOverChange={(isOver) => onOverChange(idx, isOver)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
`;
