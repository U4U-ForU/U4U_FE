"use client";

import styled from "@emotion/styled";
import ItemList from "./ItemList";
import SearchBar from "@/src/components/shared/SearchBar";
import { useState } from "react";

interface InventoryProps {
  onSelect: (name: string) => void;
}

export default function Inventory({ onSelect }: InventoryProps) {
  const [input, setInput] = useState("");

  return (
    <Wrapper>
      <SearchBarWrapper>
        <SearchBar input={input} onChange={setInput} width={404} />
      </SearchBarWrapper>
      <ItemList input={input} onSelect={onSelect} />
    </Wrapper>
  );
}

const SearchBarWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 540px;
  flex-direction: column;
  min-height: 0;
  background: var(--gray-100, #f3f2f2);
  padding: 53px 68px 0px;
  flex-shrink: 0;
`;
