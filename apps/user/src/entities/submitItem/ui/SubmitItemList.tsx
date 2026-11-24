import styled from "@emotion/styled";
import SubmitItem from "./SubmitItem";
import type { SubmittedItem } from "../model/types";

interface SubmitItemListProps {
  items: SubmittedItem[];
}

export default function SubmitItemList({ items }: SubmitItemListProps) {
  return (
    <Wrapper>
      {items.map((item) => (
        <SubmitItem
          key={item.id}
          status={item.status}
          itemName={item.itemName}
          itemDescription={item.itemDescription}
          submittedAt={item.submittedAt}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 160px);
  justify-items: center;
  column-gap: 4px;
  row-gap: 20.8px;
  padding: var(--space-12, 12px) 6px calc(100px + env(safe-area-inset-bottom));
  margin: 0 var(--space-20, 20px);
  justify-content: center;
  align-items: flex-start;
  border-radius: var(--radius-md, 12px) var(--radius-md, 12px) 0 0;
  background: rgba(255, 255, 255, 0.55);
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;
