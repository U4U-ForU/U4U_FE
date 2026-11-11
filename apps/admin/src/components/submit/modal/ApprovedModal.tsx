"use client";

import styled from "@emotion/styled";
import InfoText from "./modalItem/InfoText";
import Image from "next/image";
import Badge from "../Item/Badge";
import type { Status } from "../Item/ItemType";
import ModalLayout from "./ModalLayout";
import SubText from "./modalItem/SubText";

interface ApprovedModalProps {
  status: Status;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
}

export default function ApprovedModal({
  status,
  modalIsOpen,
  setModalIsOpen,
}: ApprovedModalProps) {
  return (
    <ModalLayout isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
      <Top>
        <SubText text="아이템 제출 심사완료 2026.10.09" />
        <Image
          src={"/icon/closeButton/icon/UI_actions/Vector.svg"}
          width={12}
          height={12}
          alt="닫기 버튼"
          onClick={() => setModalIsOpen(false)}
        />
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
          <ItemName style={{ marginBottom: "12px" }}>아이템 이름</ItemName>
          <ItemText>아이템 설명</ItemText>

          <InfoText date="2026.11.11" userName="maremare" />
        </BottomRight>
      </Bottom>
    </ModalLayout>
  );
}

const BottomRight = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 542px;
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
  display: flex;
  padding: var(--space-16, 16px) var(--space-20, 20px);
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: var(--radius-md, 12px);
  background: var(--gray-50, #f9f8f8);
  color: #000;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const ImageBox = styled.div`
  position: relative;
`;
