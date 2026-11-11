"use client";

import styled from "@emotion/styled";
import FilteringBlockList from "@/src/components/submit/filter/FilteringBlockList";
import ItemList from "@/src/components/submit/Item/ItemList";
import { useState } from "react";
import { Items } from "@/src/components/submit/Item/MockItem";
import type { Status } from "@/src/components/submit/Item/ItemType";
import PendingModal from "@/src/components/submit/modal/PendingModal";
import RecombModal from "@/src/components/submit/modal/RecombModal";
import ApprovedModal from "@/src/components/submit/modal/ApprovedModal";

export default function SubmitsPage() {
  const [active, setActive] = useState("전체");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const Filterd =
    active === "전체" ? Items : Items.filter((item) => item.status === active);

  return (
    <Wrapper>
      <FilteringBlockList items={Items} active={active} onChange={setActive} />
      <ItemList
        items={Filterd}
        onItemClick={(item) => {
          setSelectedStatus(item.status);
          setModalIsOpen(true);
        }}
      />

      {modalIsOpen && selectedStatus === "심사 중" && (
        <PendingModal
          status={selectedStatus}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      )}
      {modalIsOpen &&
        (selectedStatus === "승인 완료" ||
          selectedStatus === "거절됨" ||
          selectedStatus === "취소됨") && (
          <ApprovedModal
            status={selectedStatus}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        )}
      {modalIsOpen && selectedStatus === "조합 처리 완료" && (
        <RecombModal
          status={selectedStatus}
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
