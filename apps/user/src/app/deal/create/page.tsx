"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ItemPickerSheet from "@/src/features/deal/ui/detail/ItemPickerSheet";
import ItemList from "@/src/features/deal/ui/create.tsx/ItemList";
import type { InventoryItem } from "@/src/entities/item/model/types";
import Button from "@/src/shared/ui/Button";
import { SHEET_HALF_HEIGHT_DVH } from "@/src/shared/ui/BottomSheet";

const MAX_SELECTED_ITEMS = 10;

export default function Detail() {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<InventoryItem[]>([]);

  const addItem = (item: InventoryItem) =>
    setSelectedItems((prev) =>
      prev.length >= MAX_SELECTED_ITEMS ? prev : [...prev, item],
    );

  const removeItem = (index: number) =>
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));

  const buttonOffset = isSheetOpen ? SHEET_HALF_HEIGHT_DVH : 0;

  return (
    <Page>
      <Global styles={dealBackground} />
      <Header title="거래 생성" onBackPress={() => router.push("/deal/list")} />

      <Content>
        <Input type="text" placeholder="거래방 이름을 입력해주세요."></Input>
        <ItemList
          items={selectedItems}
          isSheetOpen={isSheetOpen}
          maxCount={MAX_SELECTED_ITEMS}
          onOpenPicker={() => setIsSheetOpen(true)}
          onRemove={removeItem}
        />
      </Content>

      <ItemPickerSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSelect={addItem}
        selectedItems={selectedItems}
        onExpandedChange={setIsSheetExpanded}
      />

      <ButtonArea $offsetDvh={buttonOffset} $isHidden={isSheetExpanded}>
        <Button
          text="거래 생성하기"
          onClick={() => router.push("/deal/list")}
          fontColor="white"
          backgroundColor="#FFD0D0"
          borderColor="#DFAFAF"
          fontBorderColor="#A75959"
          boxShadow={false}
        />
      </ButtonArea>
    </Page>
  );
}

const ButtonArea = styled.div<{ $offsetDvh: number; $isHidden: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: ${({ $offsetDvh }) => $offsetDvh}dvh;
  z-index: 103;
  display: flex;
  justify-content: center;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  pointer-events: ${({ $isHidden }) => ($isHidden ? "none" : "auto")};
  transition:
    bottom 0.25s ease,
    opacity 0.2s ease;
`;

const Input = styled.input`
  display: flex;
  height: 48px;
  padding: 0 var(--number-16, 16px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: var(--number-6, 6px);
  background: var(--color-gray-0, #fff);
  outline: none;
  border: none;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */

  ::placeholder {
    color: #b3aeaf;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 22px 11px 0;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const dealBackground = css`
  .app-background {
    background-image: url("/img/background/100.png");
  }
`;

const Page = styled.div`
  display: flex;
  height: 100dvh;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  flex-direction: column;
  align-items: center;
`;
