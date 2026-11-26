"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import ConfirmModal from "@/src/shared/ui/modal/Modal";
import ResultModal from "@/src/shared/ui/modal/ResultModal";
import SubmitItem from "@/src/entities/submitItem/ui/SubmitItem";
import SubmitItemModal from "@/src/entities/submitItem/ui/SubmitItemModal";
import { SUBMIT_STATUS_LABELS } from "@/src/entities/submitItem/model/status";
import type { SubmittedItem } from "@/src/entities/submitItem/model/types";
import {
  getMySubmitItemDetailErrorMessage,
  useMySubmitItemDetail,
} from "../model/useMySubmitItemDetail";
import {
  getCancelMySubmitItemErrorMessage,
  useCancelMySubmitItem,
} from "../model/useCancelMySubmitItem";

const CANCELABLE_STATUS = "PENDING";

interface SubmitItemCardProps {
  item: SubmittedItem;
}

export default function SubmitItemCard({ item }: SubmitItemCardProps) {
  const { submissionId, status, itemName, imageUrl, submittedAt } = item;

  const [isOpen, setIsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCanceledOpen, setIsCanceledOpen] = useState(false);

  const queryClient = useQueryClient();
  const detail = useMySubmitItemDetail(isOpen ? submissionId : null);
  const cancel = useCancelMySubmitItem();

  const itemDescription = detail.isError
    ? getMySubmitItemDetailErrorMessage(detail.error)
    : (detail.data?.description ?? "불러오는 중...");

  const detailStatus = detail.data
    ? SUBMIT_STATUS_LABELS[detail.data.status]
    : undefined;

  const closeCancel = () => {
    cancel.reset();
    setIsCancelOpen(false);
  };

  const handleCancelSubmit = () =>
    cancel.mutate(submissionId, {
      onSuccess: () => {
        setIsCancelOpen(false);
        setIsCanceledOpen(true);
      },
    });

  const handleCanceledDone = () => {
    setIsCanceledOpen(false);
    cancel.reset();
    queryClient.invalidateQueries({ queryKey: ["mySubmitItems"] });
    queryClient.removeQueries({
      queryKey: ["mySubmitItemDetail", submissionId],
    });
  };

  return (
    <>
      <SubmitItem
        status={status}
        itemName={itemName}
        imageUrl={imageUrl}
        onClick={() => setIsOpen(true)}
      />

      <ModalParent isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SubmitItemModal
          status={detailStatus ?? status}
          itemName={detail.data?.name ?? itemName}
          itemDescription={itemDescription}
          submittedAt={submittedAt}
          imageUrl={detail.data?.imageUrl ?? imageUrl}
          canCancel={detail.data?.status === CANCELABLE_STATUS}
          onClose={() => setIsOpen(false)}
          onCancelSubmit={() => {
            setIsOpen(false);
            setIsCancelOpen(true);
          }}
        />
      </ModalParent>

      <ConfirmModal
        isOpen={isCancelOpen}
        type="warn"
        title="제출 취소"
        text="정말 아이템 제출을 취소하시겠어요?"
        text2="취소한 제출은 복구할 수 없습니다."
        confirmText="제출 취소"
        confirmDisabled={cancel.isPending}
        errorMessage={
          cancel.error ? getCancelMySubmitItemErrorMessage(cancel.error) : ""
        }
        onCancel={closeCancel}
        onConfirm={handleCancelSubmit}
      />

      <ResultModal
        isOpen={isCanceledOpen}
        title="제출 취소되었습니다"
        text="제출 목록에서 사라졌어요"
        size="sm"
        onDone={handleCanceledDone}
      />
    </>
  );
}
