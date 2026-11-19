"use client";

import styled from "@emotion/styled";
import SelectBox from "../shared/SelectBox";
import type { Status } from "../Item/ItemType";
import InfoText from "./modalItem/InfoText";
import ItemDetailModal from "./ItemDetailModal";
import ItemTitle from "./modalItem/ItemTitle";
import ItemDescription from "./modalItem/ItemDescription";
import CheckModal, { type CheckType } from "./CheckModal";
import { useId, useState } from "react";

interface PendingModalProps {
  status: Status;
  onClose: () => void;
}

export default function PendingModal({ status, onClose }: PendingModalProps) {
  const titleId = useId();
  const [checkType, setCheckType] = useState<CheckType | null>(null);

  return (
    <ItemDetailModal
      onClose={onClose}
      labelledBy={titleId}
      subText="아이템 제출 심사중"
      status={status}
      overlay={
        checkType && (
          <CheckModal
            type={checkType}
            onCancel={() => setCheckType(null)}
            onConfirm={() => {
              setCheckType(null);
              onClose();
            }}
          />
        )
      }
    >
      <div>
        <ItemTitle id={titleId}>아이템 이름</ItemTitle>
        <FixedDescription>아이템 설명</FixedDescription>
        <InfoText date="2026.11.11" userName="maremare" />
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
