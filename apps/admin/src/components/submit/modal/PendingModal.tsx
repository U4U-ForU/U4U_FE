"use client";

import styled from "@emotion/styled";
import SelectBox from "../shared/SelectBox";
import type { Status } from "../Item/ItemType";
import type {
  SubmitItem,
  SubmitItemDetailApiResponse,
} from "@/src/api/SubmitItem/type";
import InfoText from "./modalItem/InfoText";
import ItemDetailModal from "./ItemDetailModal";
import ItemTitle from "./modalItem/ItemTitle";
import ItemDescription from "./modalItem/ItemDescription";
import CheckModal, { type CheckType } from "./CheckModal";
import { formatDate } from "@/src/shared/lib/formatDate";
import useApproveSubmitItem, {
  getApproveSubmitItemErrorMessage,
} from "@/src/hooks/useApproveSubmitItem";
import useCombineSubmitItem, {
  getCombineSubmitItemErrorMessage,
} from "@/src/hooks/useCombineSubmitItem";
import useRejectSubmitItem, {
  getRejectSubmitItemErrorMessage,
} from "@/src/hooks/useRejectSubmitItem";
import { useId, useState } from "react";

interface SubmitAction {
  isPending: boolean;
  errorMessage: string;
  run: (submissionId: string, onDone: () => void) => void;
  reset: () => void;
}

interface PendingModalProps {
  name: string;
  status: Status;
  item?: SubmitItem;
  detail?: SubmitItemDetailApiResponse;
  detailMessage?: string;
  onClose: () => void;
}

export default function PendingModal({
  name,
  status,
  item,
  detail,
  detailMessage,
  onClose,
}: PendingModalProps) {
  const titleId = useId();
  const [checkType, setCheckType] = useState<CheckType | null>(null);
  const submittedAt = formatDate(detail?.createdAt ?? item?.createdAt);
  const submitter = detail?.submitterLoginId ?? item?.submitterLoginId;
  const submissionId = detail?.submissionId ?? item?.submissionId;
  const approve = useApproveSubmitItem();
  const combine = useCombineSubmitItem();
  const reject = useRejectSubmitItem();

  const actionByCheckType: Partial<Record<CheckType, SubmitAction>> = {
    승인: {
      isPending: approve.isPending,
      errorMessage: approve.error
        ? getApproveSubmitItemErrorMessage(approve.error)
        : "",
      run: (id, onDone) => approve.mutate(id, { onSuccess: onDone }),
      reset: approve.reset,
    },
    등록: {
      isPending: combine.isPending,
      errorMessage: combine.error
        ? getCombineSubmitItemErrorMessage(combine.error)
        : "",
      run: (id, onDone) => combine.mutate(id, { onSuccess: onDone }),
      reset: combine.reset,
    },
    거절: {
      isPending: reject.isPending,
      errorMessage: reject.error
        ? getRejectSubmitItemErrorMessage(reject.error)
        : "",
      run: (id, onDone) => reject.mutate(id, { onSuccess: onDone }),
      reset: reject.reset,
    },
  };

  const action = checkType === null ? undefined : actionByCheckType[checkType];

  const closeCheck = () => {
    action?.reset();
    setCheckType(null);
  };

  const handleConfirm = () => {
    if (!action) {
      closeCheck();
      onClose();
      return;
    }

    if (submissionId === undefined) return;

    action.run(submissionId, () => {
      setCheckType(null);
      onClose();
    });
  };

  return (
    <ItemDetailModal
      onClose={onClose}
      labelledBy={titleId}
      subText="아이템 제출 심사중"
      status={status}
      imageUrl={detail?.imageUrl ?? item?.imageUrl}
      overlay={
        checkType && (
          <CheckModal
            type={checkType}
            isPending={action?.isPending ?? false}
            errorMessage={action?.errorMessage ?? ""}
            onCancel={closeCheck}
            onConfirm={handleConfirm}
          />
        )
      }
    >
      <div>
        <ItemTitle id={titleId}>{detail?.name ?? name}</ItemTitle>
        <FixedDescription>
          {detail?.description ?? detailMessage}
        </FixedDescription>
        {submitter && <InfoText date={submittedAt} userName={submitter} />}
      </div>

      <SelectBoxList>
        <SelectBox type="거절" onClick={() => setCheckType("거절")} />
        <SelectBox type="승인" onClick={() => setCheckType("승인")} />
        <SelectBox type="조합 등록" onClick={() => setCheckType("등록")} />
      </SelectBoxList>
    </ItemDetailModal>
  );
}

const FixedDescription = styled(ItemDescription)`
  flex: 0 1 auto;
  height: 240px;
`;

const SelectBoxList = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  bottom: 0px;
`;
