"use client";

import styled from "@emotion/styled";
import type { SubmitStatus } from "../model/types";
import Image from "next/image";
import CloseButton from "@/src/shared/ui/CloseButton";
import Button from "@/src/shared/ui/Button";
import SubmitStatusBadge from "./SubmitStatusBadge";

interface SubmitItemModalProps {
  status: SubmitStatus;
  itemName: string;
  itemDescription: string;
  submittedAt: string;
  img: string;
  onClose: () => void;
}

export default function SubmitItemModal({
  status,
  itemName,
  itemDescription,
  submittedAt,
  img,
  onClose,
}: SubmitItemModalProps) {
  const canCancel = status === "승인 전";

  return (
    <Wrapper>
      <Top>
        <CloseButtonSpacer />
        <SubmittedAt>{submittedAt} 제출</SubmittedAt>
        <CloseButton onClick={onClose} />
      </Top>
      <ImageArea>
        <OverlapBadge status={status} />
        <Image src={img} width={235} height={235} alt="아이템 이미지" />
      </ImageArea>
      <ItemName>{itemName}</ItemName>
      <ItemDes $hasButton={canCancel}>{itemDescription}</ItemDes>
      {canCancel && (
        <CancelButton
          text="제출 취소하기"
          fontColor="#fff"
          fontBorderColor="#A75959"
          backgroundColor="#E54D4D"
          boxShadow={false}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 287px;
  height: fit-content;
  max-height: 500px;
  padding: 12px 24px 24px;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  border: 2px solid var(--pink-p1, #ffe7e7);
  background: #fff;
`;

const Top = styled.div`
  display: flex;
  align-self: stretch;
  flex-shrink: 0;
  height: 24px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CloseButtonSpacer = styled.div`
  width: 43px;
`;

const SubmittedAt = styled.div`
  color: var(--color-gray-600, #868e96);
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const ImageArea = styled.div`
  position: relative;
  flex-shrink: 0;
  margin-bottom: 12px;
`;

const OverlapBadge = styled(SubmitStatusBadge)`
  position: absolute;
  top: 12px;
  left: 12px;
`;

const ItemName = styled.div`
  flex-shrink: 0;
  margin-bottom: 4px;
  align-self: stretch;
  color: var(--brown-b3, #6f5e4c);
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const ItemDes = styled.div<{ $hasButton: boolean }>`
  align-self: stretch;
  color: var(--color-gray-600, #868e96);
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  flex: 0 1 auto;
  min-height: 0;
  margin-bottom: ${({ $hasButton }) => ($hasButton ? "16px" : "0")};
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const CancelButton = styled(Button)`
  && {
    width: 235px;
    flex-shrink: 0;
  }
`;
