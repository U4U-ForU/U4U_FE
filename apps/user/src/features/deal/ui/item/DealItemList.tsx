import styled from "@emotion/styled";
import { css } from "@emotion/react";
import DealItem from "./DealItem";

interface DealItemListProps {
  itemCount: number;
  showAll?: boolean;
  itemSize?: number;
}

const VISIBLE_ITEM_COUNT = 5;
const DEFAULT_ITEM_SIZE = 50;

export default function DealItemList({
  itemCount,
  showAll = false,
  itemSize = DEFAULT_ITEM_SIZE,
}: DealItemListProps) {
  const visibleCount = showAll
    ? itemCount
    : Math.min(itemCount, VISIBLE_ITEM_COUNT);
  const hiddenCount = itemCount - visibleCount;

  return (
    <ListBox $showAll={showAll} $itemSize={itemSize}>
      {Array.from({ length: visibleCount }, (_, index) => (
        <DealItem key={index} size={itemSize} />
      ))}
      {hiddenCount > 0 && <MoreCount>+{hiddenCount}</MoreCount>}
    </ListBox>
  );
}

const ListBox = styled.div<{ $showAll: boolean; $itemSize: number }>`
  gap: 8px;
  justify-items: center;
  width: 100%;

  ${({ $showAll, $itemSize }) =>
    $showAll
      ? css`
          display: grid;
          grid-template-columns: repeat(5, ${$itemSize}px);
        `
      : css`
          display: flex;
        `}
`;

const MoreCount = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  color: var(--gray-600, #8e8889);
  text-align: center;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
