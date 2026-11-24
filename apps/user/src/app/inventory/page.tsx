"use client";

import { Global, css } from "@emotion/react";
import Header from "@/src/shared/ui/Header";
import ItemFiltering from "@/src/features/itemFiltering";
import { MOCK_ITEMS } from "@/src/entities/item/model/mockItems";
import { useBackTo } from "@/src/shared/lib/useBackTo";
import Page from "@/src/shared/ui/PageFrame";

export default function Inventory() {
  const goBack = useBackTo("/main");
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
