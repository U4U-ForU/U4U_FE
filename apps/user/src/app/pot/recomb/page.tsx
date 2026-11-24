"use client";

import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import { Button } from "@u4u/ui";
import Image from "next/image";
import ItemPickerSheet from "@/src/features/deal/ui/detail/ItemPickerSheet";
import ItemSlots from "@/src/features/pot/ui/ItemSlots";
import { useItemSlots } from "@/src/features/pot/model/useItemSlots";
import PageFrame from "@/src/shared/ui/PageFrame";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import ConfirmModal from "@/src/shared/ui/modal/Modal";
import ResultModal from "@/src/shared/ui/modal/ResultModal";
import { MOCK_RECIPES } from "@/src/features/pot/model/mockRecipes";

export default function Itemmix() {
  return (
    <Suspense>
      <Recombine />
    </Suspense>
  );
}

function Recombine() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipe =
    MOCK_RECIPES.find(({ id }) => id === Number(searchParams.get("recipe"))) ??
    MOCK_RECIPES[0];
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const {
    slots,
    selectedItems,
    isFull: canRecombine,
    isPickerOpen,
    openPicker,
    closePicker,
    fillSlot,
    clearSlot,
  } = useItemSlots();

  return (
    <Page>
      <Header
        title="아이템 재조합"
        onBackPress={() => router.push("/pot/recipechoice")}
      />

      <ItemSlots slots={slots} onSlotClick={openPicker} onRemove={clearSlot} />

      <Result>
        <Image
          src={"/tempImg/tempItemImg.png"}
          width={285}
          height={285}
          alt={recipe.resultName}
        />
        <ItemName>{recipe.resultName}</ItemName>
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
          onClick={() => setIsConfirmOpen(true)}
        />
        <Button
          text="조합법 변경"
          fontBorderColor="none"
          borderColor="#DFAFAF"
          backgroundColor="white"
          fontColor="#A75959"
          boxShadow={false}
          onClick={() => router.push("/pot/recipechoice")}
        />
      </ButtonWrapper>

      <ItemPickerSheet
        isOpen={isPickerOpen}
        onClose={closePicker}
        onSelect={fillSlot}
        selectedItems={selectedItems}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        type="confirm"
        title={"재조합을 정말\n하시겠어요?"}
        text="재조합 시 넣은 재료는 사라지며,"
        text2="조합된 아이템이 인벤토리에 지급됩니다."
        confirmText="재조합"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          setIsCompleteOpen(true);
        }}
      />

      <ResultModal
        isOpen={isCompleteOpen}
        title="재조합 완료!"
        text="인벤토리를 확인해보세요"
        onDone={() => router.push("/pot/recipechoice")}
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

const Page = styled(PageFrame)`
  align-items: center;
  justify-content: space-between;
`;
