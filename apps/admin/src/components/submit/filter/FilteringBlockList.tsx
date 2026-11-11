import FilteringBlock from "./FilteringBlock";
import styled from "@emotion/styled";
import type { ItemMockType } from "../Item/ItemType";

const FILTERS = [
  "전체",
  "심사 중",
  "승인 완료",
  "조합 처리 완료",
  "거절됨",
  "취소됨",
];

interface FilteringBlockListProps {
  items: ItemMockType[];
  active: string;
  onChange: (status: string) => void;
}

export default function FilteringBlockList({
  items,
  active,
  onChange,
}: FilteringBlockListProps) {
  const getCount = (name: string) =>
    name === "전체"
      ? items.length
      : items.filter((item) => item.status === name).length;

  return (
    <Wrapper>
      {FILTERS.map((name) => (
        <FilteringBlock
          key={name}
          title={name}
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
