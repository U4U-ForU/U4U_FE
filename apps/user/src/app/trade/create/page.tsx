"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ItemPickerSheet from "@/src/features/deal/ui/detail/ItemPickerSheet";
import ItemList from "@/src/features/deal/ui/create.tsx/ItemList";
import type { InventoryItem } from "@/src/entities/item/model/types";
import { Button } from "@u4u/ui";
import { SHEET_HALF_HEIGHT_DVH } from "@/src/shared/ui/BottomSheet";
import { useSafeBack } from "@/src/shared/lib/useSafeBack";
import PageFrame from "@/src/shared/ui/PageFrame";
import TitleInput from "@/src/shared/ui/TitleInput";
import ConfirmModal from "@/src/shared/ui/modal/Modal";
import ResultModal from "@/src/shared/ui/modal/ResultModal";

const MAX_SELECTED_ITEMS = 10;
const MAX_ROOM_NAME_LENGTH = 30;

export default function Detail() {
  const goBack = useSafeBack();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<InventoryItem[]>([]);
  const [roomName, setRoomName] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCreatedOpen, setIsCreatedOpen] = useState(false);

  const canCreate = roomName.trim() !== "" && selectedItems.length > 0;

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
      <Header title="거래 생성" onBackPress={goBack} />

      <Content>
        <TitleInput
          label="거래방 이름"
          placeholder="거래방 이름을 입력해주세요."
          maxLength={MAX_ROOM_NAME_LENGTH}
          value={roomName}
          onChange={setRoomName}
        />
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
          onClick={() => setIsConfirmOpen(true)}
          disabled={!canCreate}
          fontColor={canCreate ? "white" : "#B3AEAF"}
          backgroundColor={canCreate ? "#FFD0D0" : "#E0DDDD"}
          borderColor={canCreate ? "#DFAFAF" : "white"}
          fontBorderColor={canCreate ? "#A75959" : "none"}
          boxShadow={false}
        />
      </ButtonArea>
      <ConfirmModal
        isOpen={isConfirmOpen}
        type="confirm"
        title={"거래방을 정말\n생성하시겠어요?"}
        text="생성 후에는 등록한 아이템을"
        text2="바꿀 수 없습니다."
        confirmText="생성"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          setIsCreatedOpen(true);
        }}
      />

      <ResultModal
        isOpen={isCreatedOpen}
        title="생성되었습니다"
        text="거래 목록에서 확인해보세요"
        onDone={() => router.push("/trade/list")}
      />
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

const Page = styled(PageFrame)`
  align-items: center;
`;
