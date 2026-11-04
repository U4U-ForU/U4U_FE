"use client";

import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import Button from "@/src/shared/ui/Button";
import ItemPickerSheet from "@/src/features/deal/ui/detail/ItemPickerSheet";
import { useItemSlots } from "@/src/features/pot/model/useItemSlots";
import ChooseBoxList from "@/src/features/pot/ui/choose/ChooseBoxList";
import ChooseModal from "@/src/features/pot/ui/choose/ChooseModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Itemmix() {
  const router = useRouter();
  const { selectedItems, isPickerOpen, closePicker, fillSlot } = useItemSlots();
  const [selectedComb, setSelectedComb] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const canChoose = selectedComb !== null;

  return (
    <Page>
      <Header title="조합법 선택" />

      <Content>
        <ChooseBoxList
          selectedIndex={selectedComb}
          onSelect={setSelectedComb}
        />
      </Content>

      <ButtonArea>
        <ChooseButton
          text="재조합 하러 가기"
          borderColor={canChoose ? "#DFAFAF" : "white"}
          fontBorderColor={canChoose ? "#A75959" : "none"}
          backgroundColor={canChoose ? "#FFD0D0" : "#E0DDDD"}
          fontColor={canChoose ? "white" : "#B3AEAF"}
          boxShadow={false}
          onClick={() => setIsModalOpen(true)}
          disabled={!canChoose}
        />
      </ButtonArea>

      <ChooseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => router.push("/pot/itemmix")}
      />

      <ItemPickerSheet
        isOpen={isPickerOpen}
        onClose={closePicker}
        onSelect={fillSlot}
        selectedItems={selectedItems}
      />
    </Page>
  );
}

const BUTTON_AREA_HEIGHT = "calc(64px + 20px + env(safe-area-inset-bottom))";

const ChooseButton = styled(Button)`
  &:disabled {
    opacity: 1;
  }
`;

const ButtonArea = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${BUTTON_AREA_HEIGHT};
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const Page = styled.div`
  display: flex;
  height: 100dvh;
  flex-direction: column;
  align-items: center;
`;
