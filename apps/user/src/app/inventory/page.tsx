"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import ItemFiltering from "@/src/features/itemFiltering";
import { MOCK_ITEMS } from "@/src/entities/item/model/mockItems";
import { useSafeBack } from "@/src/shared/lib/useSafeBack";

export default function Inventory() {
  const goBack = useSafeBack();
  return (
    <Page>
      <Global styles={inventoryBackground} />
      <Header title="인벤토리" onBackPress={goBack} />
      <ItemFiltering items={MOCK_ITEMS} />
    </Page>
  );
}

const inventoryBackground = css`
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
