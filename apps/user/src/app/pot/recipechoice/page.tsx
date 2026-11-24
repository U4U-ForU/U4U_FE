"use client";

import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import { Button } from "@u4u/ui";
import ItemPickerSheet from "@/src/features/deal/ui/detail/ItemPickerSheet";
import { useItemSlots } from "@/src/features/pot/model/useItemSlots";
import ChooseBoxList from "@/src/features/pot/ui/choose/ChooseBoxList";
import ChooseModal from "@/src/features/pot/ui/choose/ChooseModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageFrame from "@/src/shared/ui/PageFrame";
import { MOCK_RECIPES } from "@/src/features/pot/model/mockRecipes";

export default function Itemmix() {
  const router = useRouter();
  const { selectedItems, isPickerOpen, closePicker, fillSlot } = useItemSlots();
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedRecipe =
    MOCK_RECIPES.find(({ id }) => id === selectedRecipeId) ?? null;

  return (
    <Page>
      <Header title="조합법 선택" onBackPress={() => router.push("/pot")} />

      <Content>
        <ChooseBoxList
          recipes={MOCK_RECIPES}
          selectedId={selectedRecipeId}
          onSelect={setSelectedRecipeId}
        />
      </Content>

      <ButtonArea>
        <ChooseButton
          text="재조합 하러 가기"
          borderColor={selectedRecipe ? "#DFAFAF" : "white"}
          fontBorderColor={selectedRecipe ? "#A75959" : "none"}
          backgroundColor={selectedRecipe ? "#FFD0D0" : "#E0DDDD"}
          fontColor={selectedRecipe ? "white" : "#B3AEAF"}
          boxShadow={false}
          onClick={() => setIsModalOpen(true)}
          disabled={selectedRecipe === null}
        />
      </ButtonArea>

      <ChooseModal
        isOpen={isModalOpen}
        resultName={selectedRecipe?.resultName ?? ""}
        materialNames={selectedRecipe?.materialNames ?? []}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() =>
          router.push(`/pot/recomb?recipe=${selectedRecipeId ?? ""}`)
        }
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

const Page = styled(PageFrame)`
  padding-bottom: 0;
  align-items: center;
`;
