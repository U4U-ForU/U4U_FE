"use client";

import styled from "@emotion/styled";
import SearchBar from "@/src/components/shared/SearchBar";
import ItemList from "@/src/components/items/ItemList";
import { useState } from "react";
import ApprovedModal from "@/src/components/submit/modal/ApprovedModal";
import type { ItemSummary } from "@/src/components/shared/mock_items";

export default function ItemsPage() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<ItemSummary | null>(null);

  return (
    <div>
      <SearchArea input={input} onChange={setInput} width={648} />
      <ItemList input={input} onItemClick={setSelected} />

      {selected && (
        <ApprovedModal name={selected.name} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

const SearchArea = styled(SearchBar)`
  margin: 48px auto 74px;
`;
