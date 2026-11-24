"use client";

import { Global, css } from "@emotion/react";
import Header from "@/src/shared/ui/Header";
import ItemFiltering from "@/src/features/itemFiltering";
import { MOCK_ITEMS } from "@/src/entities/item/model/mockItems";
import { useBackTo } from "@/src/shared/lib/useBackTo";
import Page from "@/src/shared/ui/PageFrame";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ITEM_FILTERS } from "@/src/entities/item/model/types";

export default function Inventory() {
  return (
    <Suspense>
      <InventoryPage />
    </Suspense>
  );
}

function InventoryPage() {
  const goBack = useBackTo("/main");
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const initialFilter = ITEM_FILTERS.find((item) => item === filter);

  return (
    <Page>
      <Global styles={inventoryBackground} />
      <Header title="인벤토리" onBackPress={goBack} />
      <ItemFiltering items={MOCK_ITEMS} initialFilter={initialFilter} />
    </Page>
  );
}

const inventoryBackground = css`
  .app-background {
    background-image: url("/img/background/100.png");
  }
`;
