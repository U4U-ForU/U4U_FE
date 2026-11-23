import styled from "@emotion/styled";
import Image from "next/image";

interface ProfileHeaderProps {
  title: string;
  onBackPress: () => void;
}

export default function ProfileHeader({
  title,
  onBackPress,
}: ProfileHeaderProps) {
  const backIcon = (
    <Image
      src={"/backicon/arrow.png"}
      width={24}
      height={24}
      alt="뒤로가기"
      onClick={onBackPress}
    />
  );

  return (
    <Top>
      {onBackPress ? (
        <BackButton type="button" aria-label="뒤로가기" onClick={onBackPress}>
          {backIcon}
        </BackButton>
      ) : (
        backIcon
      )}
      <Title>{title}</Title>
    </Top>
  );
}

const BackButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid var(--pink-p3, #dfafaf);
    outline-offset: 2px;
  }
`;

const Top = styled.div`
  display: flex;
  position: relative;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  margin: calc(15px + env(safe-area-inset-top)) 20px 0;
`;

const Title = styled.p`
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;

  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
