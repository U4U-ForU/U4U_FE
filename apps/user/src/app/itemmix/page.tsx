"use client";

import { useState } from "react";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import ItemInputList from "@/src/features/itemmix/ui/itemInputList";
import Button from "@/src/shared/ui/Button";
import ItemPickerSheet from "@/src/features/deal/ui/detail/ItemPickerSheet";
import { useItemSlots } from "@/src/features/pot/model/useItemSlots";
import MixModal from "@/src/features/itemmix/ui/modal/MixModal";
import ItemMixSuccess from "@/src/features/itemmix/ui/modal/itemMixSuccess";

export default function Itemmix() {
  const {
    slots,
    selectedItems,
    isFull: canMix,
    isPickerOpen,
    openPicker,
    closePicker,
    fillSlot,
    clearSlot,
    clearAllSlots,
  } = useItemSlots(4);
  const [mixStep, setMixStep] = useState<"idle" | "mixing" | "success">("idle");
  const resetMixStep = () => setMixStep("idle");

  return (
    <Page>
      <Global styles={inventoryBackground} />
      <Header title="아이템 섞기" />
      <ItemInputList
        slots={slots}
        onSlotClick={openPicker}
        onRemove={clearSlot}
      />
      <MixButton
        text="섞기"
        borderColor={canMix ? "#DFAFAF" : "white"}
        fontBorderColor={canMix ? "#A75959" : "none"}
        backgroundColor={canMix ? "#FFD0D0" : "#E0DDDD"}
        fontColor={canMix ? "white" : "#B3AEAF"}
        boxShadow={false}
        disabled={!canMix}
        onClick={() => setMixStep("mixing")}
      />

      <ItemPickerSheet
        isOpen={isPickerOpen}
        onClose={closePicker}
        onSelect={fillSlot}
        selectedItems={selectedItems}
      />

      <MixModal
        isOpen={mixStep === "mixing"}
        onClose={resetMixStep}
        onDone={() => {
          clearAllSlots();
          setMixStep("success");
        }}
      />
      <ItemMixSuccess isOpen={mixStep === "success"} onClose={resetMixStep} />
    </Page>
  );
}

const inventoryBackground = css`
  .app-background {
    background-image: url("/img/background/50.png");
  }
`;

const MixButton = styled(Button)`
  margin-top: auto;
  align-self: center;

  &:disabled {
    opacity: 1;
  }
`;

const Page = styled.div`
  display: flex;
  height: 100dvh;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  flex-direction: column;
`;
