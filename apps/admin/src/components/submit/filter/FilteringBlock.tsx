import styled from "@emotion/styled";

interface FilteringBlockProps {
  title: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export default function FilteringBlock({
  title,
  count,
  onClick,
  active,
}: FilteringBlockProps) {
  return (
    <Wrapper
      type="button"
      aria-pressed={active}
      onClick={onClick}
      $active={active}
    >
      {title} {count}
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $active: boolean }>`
  padding: var(--space-8, 8px) var(--space-20, 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 156px;
  cursor: pointer;

  color: ${({ $active }) => ($active ? "#A75959" : "#8E8889")};
  background-color: ${({ $active }) => ($active ? "#FFD0D0" : "white")};
  border: 2px solid ${({ $active }) => ($active ? "#DFAFAF" : "#D0CCCC")};

  white-space: nowrap;
  border-radius: var(--radius-full, 999999px);
  font-family: "Cafe24 Ssurround";
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;
