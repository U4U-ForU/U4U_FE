"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/src/shared/ui/Header";
import DealList from "@/src/features/deal";
import { MOCK_DEAL_ROOMS } from "@/src/features/deal/model/list/mockRooms";
import Button from "@/src/shared/ui/Button";

export default function List() {
  const router = useRouter();
  return (
    <Page>
      <Global styles={dealBackground} />
      <Header title="거래 목록" onBackPress={() => router.push("/main")} />

      <DealList rooms={MOCK_DEAL_ROOMS} />
      <CreateButton
        text="거래 생성"
        onClick={() => router.push("/deal/create")}
        fontColor="white"
        backgroundColor="#FFD0D0"
        borderColor="#DFAFAF"
        fontBorderColor="#A75959"
        boxShadow={false}
        type="button"
      />
    </Page>
  );
}

const CreateButton = styled(Button)`
  margin-top: auto;
  align-self: center;
`;

const dealBackground = css`
  .app-background {
    background-image: url("/img/background/100.png");
  }
`;

const Page = styled.div`
  display: flex;
  height: 100dvh;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  flex-direction: column;
`;
