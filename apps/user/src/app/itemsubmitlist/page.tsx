"use client";

import styled from "@emotion/styled";
import ProfileHeader from "@/src/shared/ui/Header";
import { Button } from "@u4u/ui";
import SubmitItemFiltering from "@/src/features/submitItemFiltering";
import {
  getMySubmitItemsErrorMessage,
  useMySubmitItems,
} from "@/src/features/submitItem/model/useMySubmitItems";
import { useRouter } from "next/navigation";

export default function ItemSubmitList() {
  const router = useRouter();
  const { data, isPending, isError, error } = useMySubmitItems();

  const message = isPending
    ? "제출 목록을 불러오는 중입니다."
    : isError
      ? getMySubmitItemsErrorMessage(error)
      : undefined;

  return (
    <Wrapper>
      <PageBackground aria-hidden="true" />
      <ProfileHeader
        title="아이템 제출 목록"
        onBackPress={() => {
          router.push("/main");
        }}
      />
      <SubmitItemFiltering items={data ?? []} message={message} />
      <BottomArea>
        <Button
          text="아이템 제출"
          fontColor="white"
          backgroundColor="#FFD0D0"
          boxShadow={false}
          fontBorderColor="#A75959"
          borderColor="#DFAFAF"
          onClick={() => router.push("/itemsubmit")}
        />
      </BottomArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
`;

const PageBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url("/img/background/100.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  pointer-events: none;
`;

const BottomArea = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 10;
  display: flex;
  width: min(100%, 393px);
  padding: 0 20px calc(32px + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
`;
