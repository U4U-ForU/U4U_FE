import FilteringBlock from "./FilteringBlock";
import styled from "@emotion/styled";
import {
  STATUS_LABEL,
  type ItemMockType,
  type StatusFilter,
} from "../Item/ItemType";

const FILTERS: StatusFilter[] = [
  "전체",
  "심사 중",
  "승인 완료",
  "조합 처리 완료",
  "거절됨",
  "취소됨",
];

interface FilteringBlockListProps {
  items: ItemMockType[];
  active: StatusFilter;
  onChange: (status: StatusFilter) => void;
}

export default function FilteringBlockList({
  items,
  active,
  onChange,
}: FilteringBlockListProps) {
  const getCount = (name: StatusFilter) =>
    name === "전체"
      ? items.length
      : items.filter((item) => item.status === name).length;

  return (
    <Wrapper>
      {FILTERS.map((name) => (
        <FilteringBlock
          key={name}
          title={name === "전체" ? name : STATUS_LABEL[name]}
          count={getCount(name)}
          active={active === name}
          onClick={() => onChange(name)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-12, 12px);
  width: 1000px;
  height: 44px;
  margin: 48px 0px;
`;
