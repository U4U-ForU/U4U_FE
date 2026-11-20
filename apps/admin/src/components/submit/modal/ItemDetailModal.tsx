"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import type { ReactNode } from "react";
import Badge from "../Item/Badge";
import type { Status } from "../Item/ItemType";
import CloseButton from "../shared/CloseButton";
import ModalLayout from "./ModalLayout";
import SubText from "./modalItem/SubText";

interface ItemDetailModalProps {
  onClose: () => void;
  labelledBy: string;
  subText?: string;
  status?: Status;
  children: ReactNode;
  overlay?: ReactNode;
}

export default function ItemDetailModal({
  onClose,
  labelledBy,
  subText,
  status,
  children,
  overlay,
}: ItemDetailModalProps) {
  return (
    <ModalLayout onClose={onClose} labelledBy={labelledBy}>
      <Top>
        {subText && <SubText text={subText} />}
        <CloseButton onClick={onClose} />
      </Top>

      <Bottom>
        <ImageBox>
          {status && <Badge text={status} />}
          <Image
            src={"/tempImg/itemImg/itemImg.svg"}
            width={400}
            height={400}
            alt="아이템 이미지"
            style={{ cursor: "pointer" }}
          />
        </ImageBox>

        <Right>{children}</Right>
      </Bottom>

      {overlay}
    </ModalLayout>
  );
}

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > :last-child {
    margin-left: auto;
  }
`;

const Bottom = styled.div`
  display: flex;
  gap: 48px;
`;

const ImageBox = styled.div`
  position: relative;
`;

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 542px;
`;
