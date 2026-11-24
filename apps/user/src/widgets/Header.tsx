"use client";

import styled from "@emotion/styled";
import Coin from "../entities/user/ui/Coin";
import UserProfile from "../entities/user/ui/Profile";
import { useUserStarStore } from "@/src/entities/user/model/useUserStarStore";

interface MainHeaderProps {
  onProfileClick?: () => void;
}

export default function MainHeader({ onProfileClick }: MainHeaderProps) {
  const starCount = useUserStarStore((state) => state.starCount);

  return (
    <Wrapper>
      <Coin coin={starCount} />
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
