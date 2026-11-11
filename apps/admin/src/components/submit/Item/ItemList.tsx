import Item from "./Item";
import styled from "@emotion/styled";
import type { ItemMockType } from "./ItemType";

interface ItemListProps {
  items: ItemMockType[];
  onItemClick: (item: ItemMockType) => void;
}

export default function ItemList({ items, onItemClick }: ItemListProps) {
  return (
    <Wrapper>
      {items.map((item) => (
        <Item
          key={item.id}
          name={item.title}
          status={item.status}
          onClick={() => onItemClick(item)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 1200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
`;
