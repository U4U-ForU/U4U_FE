"use client";

import styled from "@emotion/styled";
import SearchBar from "@/src/components/shared/SearchBar";
import ItemList from "@/src/components/items/ItemList";
import { useState } from "react";
import ApprovedModal from "@/src/components/submit/modal/ApprovedModal";

export default function ItemsPage() {
  const [input, setInput] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <SearchArea input={input} onChange={setInput} width={648} />
      <ItemList input={input} onItemClick={() => setModalIsOpen(true)} />

      {modalIsOpen && <ApprovedModal onClose={() => setModalIsOpen(false)} />}
    </div>
  );
}

const SearchArea = styled(SearchBar)`
  margin: 48px auto 74px;
`;
