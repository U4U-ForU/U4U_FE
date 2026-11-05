import styled from "@emotion/styled";
import Image from "next/image";

interface UserProfileProps {
  onClick?: () => void;
}

export default function UserProfile({ onClick }: UserProfileProps) {
  return (
    <ProfileButton type="button" aria-label="마이페이지 열기" onClick={onClick}>
      <Image src="/img/ProfileImg.svg" alt="" width={36} height={36} />
    </ProfileButton>
  );
}

const ProfileButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
