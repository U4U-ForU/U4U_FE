import Item from "./Item";
import styled from "@emotion/styled";
import { mock_items } from "@/src/components/shared/mock_items";

interface ItemListProps {
  input: string;
  onItemClick: () => void;
}

export default function ItemList({ input, onItemClick }: ItemListProps) {
  const filtered = mock_items.filter((item) =>
    item.name.includes(input.trim()),
  );

  return (
    <Wrapper>
      {filtered.map((item) => (
        <Item key={item.id} name={item.name} onClick={onItemClick} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(6, max-content);
  justify-content: center;
  margin-bottom: 36px;
`;
