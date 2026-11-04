import ChooseBox from "./ChooseBox";
import styled from "@emotion/styled";

const MOCK_COMB_COUNT = 7;

interface ChooseBoxListProps {
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function ChooseBoxList({
  selectedIndex,
  onSelect,
}: ChooseBoxListProps) {
  return (
    <Wrapper>
      {Array.from({ length: MOCK_COMB_COUNT }, (_, index) => (
        <ChooseBox
          key={index}
          selected={selectedIndex === index}
          onClick={() => onSelect(index)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
`;
