"use client";

import styled from "@emotion/styled";
import FilteringBlockList from "@/src/components/submit/filter/FilteringBlockList";
import ItemList from "@/src/components/submit/Item/ItemList";
import { useState } from "react";
import { mock_submits } from "@/src/components/submit/Item/mock_submits";
import type {
  ItemMockType,
  StatusFilter,
} from "@/src/components/submit/Item/ItemType";
import { MODAL_BY_STATUS } from "@/src/components/submit/modal/modalByStatus";
import { findRecipe } from "@/src/components/recipes/mock_recipes";

export default function SubmitsPage() {
  const [active, setActive] = useState<StatusFilter>("전체");
  const [selected, setSelected] = useState<ItemMockType | null>(null);

  const filtered =
    active === "전체"
      ? mock_submits
      : mock_submits.filter((item) => item.status === active);

  const Modal = selected ? MODAL_BY_STATUS[selected.status] : null;
  const recipe = selected ? findRecipe(selected.id) : null;

  return (
    <Wrapper>
      <FilteringBlockList
        items={mock_submits}
        active={active}
        onChange={setActive}
      />
      <ItemList items={filtered} onItemClick={setSelected} />

      {Modal && selected && recipe && (
        <Modal
          status={selected.status}
          recipe={recipe}
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
