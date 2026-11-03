"use client";

import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import Button from "@/src/shared/ui/Button";
import Image from "next/image";
import ItemPickerSheet from "@/src/features/deal/ui/detail/ItemPickerSheet";
import ItemSlots from "@/src/features/pot/ui/ItemSlots";
import { useItemSlots } from "@/src/features/pot/model/useItemSlots";

export default function Itemmix() {
  const {
    slots,
    selectedItems,
    canRecombine,
    isPickerOpen,
    openPicker,
    closePicker,
    fillSlot,
    clearSlot,
  } = useItemSlots();

  return (
    <Page>
      <Header title="아이템 재조합 " />

      <ItemSlots
        slots={slots}
        onSlotClick={openPicker}
        onRemove={clearSlot}
      />

      <Result>
        <Image
          src={"/tempImg/tempItemImg.png"}
          width={285}
          height={285}
          alt="이미지"
        />
        <ItemName>아이템 이름</ItemName>
      </Result>

      <ButtonWrapper>
        <RecombineButton
          text="재조합하기"
          borderColor={canRecombine ? "#DFAFAF" : "white"}
          fontBorderColor={canRecombine ? "#A75959" : "none"}
          backgroundColor={canRecombine ? "#FFD0D0" : "#E0DDDD"}
          fontColor={canRecombine ? "white" : "#B3AEAF"}
          boxShadow={false}
          disabled={!canRecombine}
        />
        <Button
          text="조합법 변경"
          fontBorderColor="none"
          borderColor="#DFAFAF"
          backgroundColor="white"
          fontColor="#A75959"
          boxShadow={false}
        />
      </ButtonWrapper>

      <ItemPickerSheet
        isOpen={isPickerOpen}
        onClose={closePicker}
        onSelect={fillSlot}
        selectedItems={selectedItems}
      />
    </Page>
  );
}

const Result = styled.div``;

const ItemName = styled.div`
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  margin-top: 4px;
`;

const RecombineButton = styled(Button)`
  &:disabled {
    opacity: 1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 32px;
`;

const Page = styled.div`
  display: flex;
  height: 90dvh;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
