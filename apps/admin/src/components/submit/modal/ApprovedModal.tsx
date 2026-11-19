"use client";

import InfoText from "./modalItem/InfoText";
import type { Status } from "../Item/ItemType";
import ItemDetailModal from "./ItemDetailModal";
import ItemTitle from "./modalItem/ItemTitle";
import ItemDescription from "./modalItem/ItemDescription";
import { useId } from "react";

interface ApprovedModalProps {
  status?: Status;
  onClose: () => void;
}

export default function ApprovedModal({ status, onClose }: ApprovedModalProps) {
  const titleId = useId();

  return (
    <ItemDetailModal
      onClose={onClose}
      labelledBy={titleId}
      subText={status && "아이템 제출 심사완료 2026.10.09"}
      status={status}
    >
      <ItemTitle id={titleId}>아이템 이름</ItemTitle>
      <ItemDescription>아이템 설명</ItemDescription>
      <InfoText date="2026.11.11" userName="maremare" />
    </ItemDetailModal>
  );
}
