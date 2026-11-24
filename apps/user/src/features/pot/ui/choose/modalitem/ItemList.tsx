import Item from "./Item";
import styled from "@emotion/styled";

interface ItemListProps {
  names: string[];
}

export default function ItemList({ names }: ItemListProps) {
  return (
    <SubItems>
      {names.map((name, index) => (
        <Item key={`${name}-${index}`} name={name} />
      ))}
    </SubItems>
  );
}

const SubItems = styled.div`
  display: flex;

  & > * + * {
    margin-left: -14px;
  }
`;
