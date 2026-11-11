"use client";

import styled from "@emotion/styled";
import FilteringBlockList from "@/src/components/submit/filter/FilteringBlockList";
import ItemList from "@/src/components/submit/Item/ItemList";
import { useState } from "react";
import { Items } from "@/src/components/submit/Item/MockItem";
import PendingModal from "@/src/components/submit/modal/PendingModal";
import RecombModal from "@/src/components/submit/modal/RecombModal";
import ApprovedModal from "@/src/components/submit/modal/ApprovedModal";

export default function SubmitsPage() {
  const [active, setActive] = useState("전체");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const Filterd =
    active === "전체" ? Items : Items.filter((item) => item.status === active);

  return (
    <Wrapper>
      <FilteringBlockList items={Items} active={active} onChange={setActive} />
      <ItemList items={Filterd} onItemClick={() => setModalIsOpen(true)} />

      {modalIsOpen && (
        <RecombModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  align-items: center;
`;
