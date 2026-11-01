import styled from "@emotion/styled";

interface FilterBoxProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

export default function FilterBox({ text, isActive, onClick }: FilterBoxProps) {
  return (
    <Wrapper
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      $isActive={isActive}
    >
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $isActive: boolean }>`
  display: flex;
  padding: var(--space-8, 8px) var(--space-20, 20px);
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: var(--radius-full, 999999px);
  border: 2px solid ${({ $isActive }) => ($isActive ? "#DFAFAF" : "#ADB5BD")};
  background: ${({ $isActive }) => ($isActive ? "#FFD0D0" : "#FFF")};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? "#A75959" : "#868E96")};
  font-family: "Cafe24 Ssurround";
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;
