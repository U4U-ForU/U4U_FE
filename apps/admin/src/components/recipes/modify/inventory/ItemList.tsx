"use client";

import styled from "@emotion/styled";
import InventoryItem from "./InventoryItem";
import { mock_items } from "@/src/components/shared/mock_items";

interface ItemListProps {
  input: string;
  onSelect: (name: string) => void;
}

export default function ItemList({ input, onSelect }: ItemListProps) {
  const filtered = mock_items.filter((item) =>
    item.name.includes(input.trim()),
  );

  return (
    <Wrapper>
      {filtered.map((item) => (
        <InventoryItem key={item.id} name={item.name} onSelect={onSelect} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 92px);
  justify-content: center;
  align-content: start;
  align-items: start;
  gap: var(--space-12, 12px);
  align-self: stretch;
  margin: 12px -68px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;
