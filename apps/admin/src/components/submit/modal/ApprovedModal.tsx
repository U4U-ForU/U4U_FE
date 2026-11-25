"use client";

import InfoText from "./modalItem/InfoText";
import type { Status } from "../Item/ItemType";
import type {
  SubmitItem,
  SubmitItemDetailApiResponse,
} from "@/src/api/SubmitItem/type";
import ItemDetailModal from "./ItemDetailModal";
import ItemTitle from "./modalItem/ItemTitle";
import ItemDescription from "./modalItem/ItemDescription";
import { formatDate } from "@/src/shared/lib/formatDate";
import { useId } from "react";

interface ApprovedModalProps {
  name: string;
  status?: Status;
  item?: SubmitItem;
  detail?: SubmitItemDetailApiResponse;
  detailMessage?: string;
  onClose: () => void;
}

export default function ApprovedModal({
  name,
  status,
  item,
  detail,
  detailMessage,
  onClose,
}: ApprovedModalProps) {
  const titleId = useId();
  const approvedAt = formatDate(detail?.approvedAt);
  const reviewedText = approvedAt
    ? `아이템 제출 심사완료 ${approvedAt}`
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
    >
      <ItemTitle id={titleId}>{detail?.name ?? name}</ItemTitle>
      <ItemDescription>{detail?.description ?? detailMessage}</ItemDescription>
      {submitter && <InfoText date={submittedAt} userName={submitter} />}
    </ItemDetailModal>
  );
}
