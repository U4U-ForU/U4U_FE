import styled from "@emotion/styled";
import PotMenuItem from "./eachButton/PotMenuItem";
import GachaMenuItem from "./eachButton/GachaMenuItem";
import InventoryMenuItem from "./eachButton/InventoryMenuItem";
import SubmitMenuItem from "./eachButton/SubmitMenuItem";

export default function MainMenuItemList() {
  return (
    <Wrapper>
      <SubmitMenuItem />
      <PotMenuItem />
      <InventoryMenuItem />
      <GachaMenuItem />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  margin-top: 16px;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 0;
`;
