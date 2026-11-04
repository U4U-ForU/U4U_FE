import Item from "./Item";
import styled from "@emotion/styled";

export default function ItemList() {
  return (
    <SubItems>
      <Item />
      <Item />
      <Item />
    </SubItems>
  );
}

const SubItems = styled.div`
  display: flex;

  & > * + * {
    margin-left: -14px;
  }
`;
