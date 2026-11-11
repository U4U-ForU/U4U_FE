"use client";

import styled from "@emotion/styled";
import SelectBox from "../shared/SelectBox";
import SubText from "./modalItem/SubText";
import Image from "next/image";
import Badge from "../Item/Badge";
import type { Status } from "../Item/ItemType";
import ModalLayout from "./ModalLayout";
import CloseButton from "../shared/CloseButton";
import InfoText from "./modalItem/InfoText";
import CheckModal, { type CheckType } from "./CheckModal";
import { useId, useState } from "react";

interface PendingModalProps {
  status: Status;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
}

export default function PendingModal({
  status,
  modalIsOpen,
  setModalIsOpen,
}: PendingModalProps) {
  const titleId = useId();
  const [checkType, setCheckType] = useState<CheckType | null>(null);

  return (
    <ModalLayout
      isOpen={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      labelledBy={titleId}
    >
      <Top>
        <SubText text="아이템 제출 심사중" />
        <CloseButton onClick={() => setModalIsOpen(false)} />
      </Top>

      <Bottom>
        <ImageBox>
          <Badge text={status} />
          <Image
            src={"/tempImg/itemImg/itemImg.svg"}
            width={400}
            height={400}
            alt="아이템 이미지"
            style={{ cursor: "pointer" }}
          />
        </ImageBox>

        <BottomRight>
          <div>
            <ItemName id={titleId} style={{ marginBottom: "12px" }}>
              아이템 이름
            </ItemName>
            <ItemText>아이템 설명</ItemText>
            <InfoText date="2026.11.11" userName="maremare" />
          </div>

          <SelectBoxList>
            <SelectBox type="거절" onClick={() => setCheckType("거절")} />
            <SelectBox type="승인" onClick={() => setCheckType("승인")} />
            <SelectBox type="조합 등록" onClick={() => setCheckType("등록")} />
          </SelectBoxList>
        </BottomRight>
      </Bottom>

      {checkType && (
        <CheckModal
          type={checkType}
          onCancel={() => setCheckType(null)}
          onConfirm={() => {
            setCheckType(null);
            setModalIsOpen(false);
          }}
        />
      )}
    </ModalLayout>
  );
}

const SelectBoxList = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  bottom: 0px;
`;

const BottomRight = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: flex;
  gap: 48px;
`;

const ItemName = styled.div`
  color: #000;
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
`;

const ItemText = styled.div`
  color: #000;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  display: flex;
  height: 240px;
  padding: var(--space-16, 16px) var(--space-20, 20px);
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: var(--radius-md, 12px);
  background: var(--gray-50, #f9f8f8);
`;

const ImageBox = styled.div`
  position: relative;
`;
