"use client";

import styled from "@emotion/styled";
import type { Status } from "../Item/ItemType";
import type {
  SubmitItem,
  SubmitItemDetailApiResponse,
} from "@/src/api/SubmitItem/type";
import { formatDate } from "@/src/shared/lib/formatDate";
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
  recipe: Recipe | null;
  name?: string;
  status?: Status;
  item?: SubmitItem;
  detail?: SubmitItemDetailApiResponse;
  onClose: () => void;
}

export default function RecombModal({
  recipe,
  name,
  status,
  item,
  detail,
  onClose,
}: RecombModalProps) {
  const titleId = useId();
  const router = useRouter();
  const [isDeleteCheckOpen, setIsDeleteCheckOpen] = useState(false);
  const combinedAt = formatDate(detail?.combinedAt ?? detail?.approvedAt);
  const reviewedText = combinedAt
    ? `아이템 제출 심사완료 ${combinedAt}`
    : "아이템 제출 심사완료";
  const submittedAt = formatDate(detail?.createdAt ?? item?.createdAt);
  const submitter = detail?.submitterLoginId ?? item?.submitterLoginId;

  return (
    <ItemDetailModal
      onClose={onClose}
      labelledBy={titleId}
      subText={status && reviewedText}
      status={status}
      imageUrl={detail?.imageUrl ?? item?.imageUrl}
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
        <ItemTitle id={titleId}>
          {detail?.name ?? name ?? recipe?.result.name}
        </ItemTitle>
        {recipe && (
          <ImageWrapper>
            {recipe.ingredients.map((ingredient, idx) => (
              <RecombItem key={idx} text={ingredient} />
            ))}
          </ImageWrapper>
        )}

        {submitter && <InfoText date={submittedAt} userName={submitter} />}
      </Top>

      <SelectBoxWrapper>
        {recipe && (
          <SelectBox
            modalType="수정"
            onClick={() => router.push(`/recipes/${recipe.id}/modify`)}
          />
        )}
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
