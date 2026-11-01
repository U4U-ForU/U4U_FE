import DealItemList from "../item/DealItemList";
import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface RoomDetailProps {
  title: string;
  date: string;
  writer: string;
  text: string;
  commentCount: number;
  menu?: ReactNode;
  children?: ReactNode;
}

export default function RoomDetail({
  title,
  date,
  writer,
  text,
  commentCount,
  menu,
  children,
}: RoomDetailProps) {
  return (
    <Wrapper>
      {menu}
      <Title>{title}</Title>
      <Info>
        <InfoDetail>{date}</InfoDetail>
        <InfoDetail>@{writer}</InfoDetail>
      </Info>
      <Text>{text}</Text>
      <DealItemList itemCount={10} showAll />
      <CommentCount>댓글 {commentCount}개</CommentCount>
      {children}
    </Wrapper>
  );
}

const CommentCount = styled.div`
  color: var(--gray-600, #8e8889);
  text-align: center;

  /* body/body-small */
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  display: flex;
  padding: var(--space-6, 6px);
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-top: 1px solid var(--gray-400, #d0cccc);
  border-bottom: 1px solid var(--gray-400, #d0cccc);
  margin: 20px 0 0;
`;

const Text = styled.div`
  color: var(--gray-700, #504a4c);

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  margin: 12px 0px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoDetail = styled.div`
  color: var(--gray-600, #8e8889);
  text-align: center;

  /* body/body-small */
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 353px;
  padding: var(--space-20, 20px);
  border-radius: var(--radius-md, 12px);
  background: #fff;
`;

const Title = styled.div`
  color: var(--gray-700, #504a4c);
  font-family: "Cafe24 Ssurround";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
`;
