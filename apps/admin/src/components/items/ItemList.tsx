import Item from "./Item";
import styled from "@emotion/styled";
import { mock_item } from "./mock";

interface ItemListProps {
  input: string;
  onItemClick: () => void;
}

export default function ItemList({ input, onItemClick }: ItemListProps) {
  const Filterd = mock_item.filter((itemName) =>
    itemName.includes(input.trim()),
  );

  return (
    <Wrapper>
      {Filterd.map((item, index) => (
        <Item name={item} key={index} onClick={onItemClick} />
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
