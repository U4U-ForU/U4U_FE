"use client";

import { useState } from "react";
import DropDown from "@/src/shared/ui/DropDown";
import EmptyList from "@/src/shared/ui/EmptyList";
import SubmitItemList from "@/src/entities/submitItem/ui/SubmitItemList";
import SubmitItemCard from "@/src/features/submitItem/ui/SubmitItemCard";
import {
  SUBMIT_FILTERS,
  type SubmitFilter,
  type SubmittedItem,
} from "@/src/entities/submitItem/model/types";

const EMPTY_MESSAGE: Record<SubmitFilter, string> = {
  전체: "제출한 아이템이 없습니다.",
  "승인 전": "승인 전 상태인 아이템이 없습니다.",
  승인거절: "승인 거절된 아이템이 없습니다.",
  "조합아이템 승인": "조합아이템으로 승인된 아이템이 없습니다.",
  승인완료: "승인 완료된 아이템이 없습니다.",
};

interface SubmitItemFilteringProps {
  items: SubmittedItem[];
  message?: string;
}

export default function SubmitItemFiltering({
  items,
  message,
}: SubmitItemFilteringProps) {
  const [filter, setFilter] = useState<SubmitFilter>("전체");

  const filteredItems =
    filter === "전체" ? items : items.filter((item) => item.status === filter);

  return (
    <>
      <DropDown options={SUBMIT_FILTERS} value={filter} onChange={setFilter} />
      {message ? (
        <EmptyList text={message} />
      ) : filteredItems.length === 0 ? (
        <EmptyList text={EMPTY_MESSAGE[filter]} />
      ) : (
        <SubmitItemList>
          {filteredItems.map((item) => (
            <SubmitItemCard key={item.submissionId} item={item} />
          ))}
        </SubmitItemList>
      )}
    </>
  );
}
