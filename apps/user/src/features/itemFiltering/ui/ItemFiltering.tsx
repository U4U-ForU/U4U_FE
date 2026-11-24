import { useState } from "react";
import FilterBoxList from "./FilterBoxList";
import EmptyList from "@/src/shared/ui/EmptyList";
import ItemList from "@/src/entities/item/ui/ItemList";
import type {
  InventoryItem,
  ItemFilter,
} from "@/src/entities/item/model/types";

const EMPTY_MESSAGE: Record<ItemFilter, string> = {
  전체: "보유/예약 중인 아이템이 없습니다.",
  보유: "보유 중인 아이템이 없습니다.",
  예약: "예약 중인 아이템이 없습니다.",
};

interface ItemFilteringProps {
  items: InventoryItem[];
  initialFilter?: ItemFilter;
}

export default function ItemFiltering({
  items,
  initialFilter = "전체",
}: ItemFilteringProps) {
  const [filter, setFilter] = useState<ItemFilter>(initialFilter);

  const filteredItems =
    filter === "전체" ? items : items.filter((item) => item.status === filter);

  return (
    <>
      <FilterBoxList value={filter} onChange={setFilter} />
      {filteredItems.length === 0 ? (
        <EmptyList text={EMPTY_MESSAGE[filter]} />
      ) : (
        <ItemList items={filteredItems} filter={filter} />
      )}
    </>
  );
}
