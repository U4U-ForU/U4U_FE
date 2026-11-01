import styled from "@emotion/styled";
import FilterBox from "./FilterBox";
import type { DealFilter } from "../../model/list/types";

const FILTERS: DealFilter[] = ["전체", "내 글", "내 댓글"];

interface FilterBoxListProps {
  value: DealFilter;
  onChange: (value: DealFilter) => void;
}

export default function FilterBoxList({ value, onChange }: FilterBoxListProps) {
  return (
    <Wrapper>
      {FILTERS.map((filter) => (
        <FilterBox
          key={filter}
          text={filter}
          isActive={filter === value}
          onClick={() => onChange(filter)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-top: 16px;
  width: 100%;
  padding: var(--space-16, 16px) 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
