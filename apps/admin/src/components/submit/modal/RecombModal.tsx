"use client";

import styled from "@emotion/styled";
import type { Status } from "../Item/ItemType";
import RecombItem from "./modalItem/RecombItem";
import SelectBox from "../shared/SelectBox";
import InfoText from "./modalItem/InfoText";
import ItemDetailModal from "./ItemDetailModal";
import ItemTitle from "./modalItem/ItemTitle";
import CheckModal from "./CheckModal";
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import type { Recipe } from "../../recipes/mock_recipes";

interface RecombModalProps {
  recipe: Recipe;
  status?: Status;
  onClose: () => void;
}

export default function RecombModal({
  recipe,
  status,
  onClose,
}: RecombModalProps) {
  const titleId = useId();
  const router = useRouter();
  const [isDeleteCheckOpen, setIsDeleteCheckOpen] = useState(false);

  return (
    <ItemDetailModal
      onClose={onClose}
      labelledBy={titleId}
      subText={status && "아이템 제출 심사완료 2026.10.09"}
      status={status}
      overlay={
        isDeleteCheckOpen && (
          <CheckModal
            type="삭제"
            target={status ? "아이템" : "조합법"}
            onCancel={() => setIsDeleteCheckOpen(false)}
            onConfirm={() => {
              setIsDeleteCheckOpen(false);
              onClose();
            }}
          />
        )
      }
    >
      <Top>
        <ItemTitle id={titleId}>{recipe.result.name}</ItemTitle>
        <ImageWrapper>
          {recipe.ingredients.map((ingredient, idx) => (
            <RecombItem key={idx} text={ingredient} />
          ))}
        </ImageWrapper>

        <InfoText date="2026.11.11" userName="maremare" />
      </Top>

      <SelectBoxWrapper>
        <SelectBox
          modalType="수정"
          onClick={() => router.push(`/recipes/${recipe.id}/modify`)}
        />
        <SelectBox
          modalType="삭제"
          onClick={() => setIsDeleteCheckOpen(true)}
        />
      </SelectBoxWrapper>
    </ItemDetailModal>
  );
}

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-bottom: 10px;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const ImageWrapper = styled.div`
  display: flex;
  gap: 32px;
`;
