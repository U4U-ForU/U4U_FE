import Item from "./Item";
import styled from "@emotion/styled";
import type { ItemMockType } from "./ItemType";

interface ItemListProps {
  items: ItemMockType[];
}

export default function ItemList({ items }: ItemListProps) {
  return (
    <Wrapper>
      {items.map((item) => (
        <Item name={item.title} key={item.id} status={item.status} />
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
