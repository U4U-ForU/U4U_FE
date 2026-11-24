"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import DealList from "@/src/features/deal";
import { MOCK_DEAL_ROOMS } from "@/src/features/deal/model/list/mockRooms";
import { Button } from "@u4u/ui";
import { useBackTo } from "@/src/shared/lib/useBackTo";
import Page from "@/src/shared/ui/PageFrame";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function List() {
  return (
    <Suspense>
      <TradeList />
    </Suspense>
  );
}

function TradeList() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") ?? "전체";
  const goBack = useBackTo(
    searchParams.get("from") === "inventory"
      ? `/inventory?filter=${encodeURIComponent(filter)}`
      : "/main",
  );
  const router = useRouter();
  return (
    <Page>
      <Global styles={dealBackground} />
      <Header title="거래 목록" onBackPress={goBack} />

      <DealList rooms={MOCK_DEAL_ROOMS} />
      <CreateButton
        text="거래 생성"
        onClick={() => router.push("/trade/create")}
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
