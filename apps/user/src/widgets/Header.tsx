import styled from "@emotion/styled";
import Coin from "../entities/user/ui/Coin";
import UserProfile from "../entities/user/ui/Profile";

interface MainHeaderProps {
  onProfileClick?: () => void;
}

export default function MainHeader({ onProfileClick }: MainHeaderProps) {
  return (
    <Wrapper>
      <Coin coin={100} />
      <UserProfile onClick={onProfileClick} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
