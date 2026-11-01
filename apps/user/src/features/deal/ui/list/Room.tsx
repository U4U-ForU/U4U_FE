import styled from "@emotion/styled";
import Image from "next/image";
import DealItemList from "../item/DealItemList";

interface RoomProps {
  name: string;
  itemCount: number;
  commentCount: number;
  nickname: string;
  onClick: () => void;
}

export default function Room({
  name,
  itemCount,
  commentCount,
  nickname,
  onClick,
}: RoomProps) {
  return (
    <Wrapper onClick={onClick}>
      <Top>
        <Title>{name}</Title>
        <MoveButton type="button" aria-label={`${name} 방으로 이동`}>
          <Image src="/img/Gacha/arrow.svg" width={10} height={10} alt="" />
        </MoveButton>
      </Top>
      <DealItemList itemCount={itemCount} />
      <Bottom>
        <Comment>댓글 {commentCount}</Comment>
        <NickName>{nickname}</NickName>
      </Bottom>
    </Wrapper>
  );
}

const MoveButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Bottom = styled.div`
  display: flex;
  margin-top: var(--space-8, 8px);
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NickName = styled.div`
  color: var(--gray-700, #504a4c);
  text-align: center;

  /* body/body-small */
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

const Comment = styled.div`
  color: var(--gray-700, #504a4c);
  text-align: center;

  /* body/body-small */
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

const Top = styled.div`
  display: flex;
  margin-bottom: var(--space-16, 16px);
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  padding: var(--space-16, 16px) var(--space-20, 20px);
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: var(--radius-md, 12px);
  background: #fff;
  cursor: pointer;

  /* shadow/200 */
  box-shadow: 0 0 5px 0 var(--color-opacity-black-15, rgba(0, 0, 0, 0.15));
`;

const Title = styled.div`
  overflow: hidden;
  color: var(--gray-700, #504a4c);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "Cafe24 Ssurround";
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;
