"use client";

import styled from "@emotion/styled";
import type { SubmitStatus } from "../model/types";
import { useState } from "react";
import Modal from "@/src/shared/ui/modal/ModalParent";
import SubmitItemModal from "./SubmitItemModal";
import SubmitStatusBadge from "./SubmitStatusBadge";

interface SubmitItemProps {
  status: SubmitStatus;
  itemName: string;
  itemDescription: string;
  submittedAt: string;
}

export default function SubmitItem({
  status,
  itemName,
  itemDescription,
  submittedAt,
}: SubmitItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Wrapper type="button" onClick={() => setIsOpen(true)}>
        <Status status={status} />
        <Img src="/tempImg/tempItemImg.png"></Img>
        <ItemName>{itemName}</ItemName>
      </Wrapper>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SubmitItemModal
          status={status}
          itemName={itemName}
          itemDescription={itemDescription}
          submittedAt={submittedAt}
          img="/tempImg/tempItemImg.png"
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
}

const Status = styled(SubmitStatusBadge)`
  margin-bottom: -16px;
  margin-left: -12px;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.button`
  display: block;
  width: 136px;
  height: 197px;
  margin: 0px 12px;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Img = styled.img`
  display: flex;
  height: 136px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  aspect-ratio: 1/1;
`;

const ItemName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  height: 28.8px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  text-overflow: ellipsis;
  word-break: keep-all;
  overflow-wrap: anywhere;
  font-family: "Cafe24 Ssurround";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
  width: 136px;
  margin-top: 7px;
`;
