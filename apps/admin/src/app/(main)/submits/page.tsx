"use client";

import styled from "@emotion/styled";
import FilteringBlockList from "@/src/components/submit/filter/FilteringBlockList";
import ItemList from "@/src/components/submit/Item/ItemList";
import { useState } from "react";
import {
  toStatus,
  type StatusFilter,
} from "@/src/components/submit/Item/ItemType";
import { MODAL_BY_STATUS } from "@/src/components/submit/modal/modalByStatus";
import useGetSubmitItems, {
  getSubmitItemsErrorMessage,
} from "@/src/hooks/useGetSubmitItems";
import useGetSubmitItemDetail, {
  getSubmitItemDetailErrorMessage,
} from "@/src/hooks/useGetSubmitItemDetail";
import type { SubmitItem } from "@/src/api/SubmitItem/type";

export default function SubmitsPage() {
  const [active, setActive] = useState<StatusFilter>("전체");
  const [selected, setSelected] = useState<SubmitItem | null>(null);
  const { data, isLoading, isError, error } = useGetSubmitItems();
  const detailQuery = useGetSubmitItemDetail(selected?.submissionId ?? null);

  const items = data ?? [];

  const filtered =
    active === "전체"
      ? items
      : items.filter((item) => toStatus(item.status) === active);

  const selectedStatus = selected ? toStatus(selected.status) : null;
  const Modal = selectedStatus ? MODAL_BY_STATUS[selectedStatus] : null;

  const getDetailMessage = () => {
    if (detailQuery.isLoading) return "불러오는 중이에요";
    if (detailQuery.isError) {
      return getSubmitItemDetailErrorMessage(detailQuery.error);
    }

    return "";
  };

  return (
    <Wrapper>
      <FilteringBlockList items={items} active={active} onChange={setActive} />
      <ItemList
        items={filtered}
        isLoading={isLoading}
        errorMessage={isError ? getSubmitItemsErrorMessage(error) : ""}
        onItemClick={setSelected}
      />

      {Modal && selected && selectedStatus && (
        <Modal
          name={selected.name}
          status={selectedStatus}
          item={selected}
          detail={detailQuery.data}
          detailMessage={getDetailMessage()}
          recipe={null}
          onClose={() => setSelected(null)}
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
