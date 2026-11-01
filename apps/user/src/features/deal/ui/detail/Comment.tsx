"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import DealItemList from "../item/DealItemList";
import Modal from "@/src/shared/ui/modal/Modal";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import Button from "@/src/shared/ui/Button";

const ACCEPTED_MODAL_DURATION = 1000;

interface CommentProps {
  nickname: string;
  itemCount: number;
  isMine: boolean;
  onDelete: () => void;
  onAccept?: () => void;
}

export default function Comment({
  nickname,
  itemCount,
  isMine,
  onDelete,
  onAccept,
}: CommentProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(false);

  useEffect(() => {
    if (!isAcceptedOpen) return;

    const timer = setTimeout(() => {
      setIsAcceptedOpen(false);
      onAccept?.();
    }, ACCEPTED_MODAL_DURATION);

    return () => clearTimeout(timer);
  }, [isAcceptedOpen, onAccept]);

  return (
    <Wrapper>
      <Top>
        <Username>{nickname}</Username>
        {isMine && (
          <Delete type="button" onClick={() => setIsDeleteOpen(true)}>
            삭제
          </Delete>
        )}
      </Top>
      <DealItemList itemCount={itemCount} showAll itemSize={44} />
      {onAccept && (
        <AcceptButton
          text="거래 수락하기"
          fontColor="#A75959"
          backgroundColor="#FFD0D0"
          borderColor="#DFAFAF"
          boxShadow={false}
          onClick={() => setIsAcceptOpen(true)}
        />
      )}

      <Modal
        title="거래를 정말 
                수락하시겠어요 ?"
        text="거래 수락 시 등록된 아이템은 소멸되며,"
        text2="제안된 아이템이 인벤토리에 지급됩니다."
        confirmText="수락"
        type="confirm"
        isOpen={isAcceptOpen}
        onCancel={() => setIsAcceptOpen(false)}
        onConfirm={() => {
          setIsAcceptOpen(false);
          setIsAcceptedOpen(true);
        }}
      />

      <ModalParent isOpen={isAcceptedOpen}>
        <AcceptedBox>거래가 수락되었습니다</AcceptedBox>
      </ModalParent>

      <Modal
        title="댓글 삭제"
        text="정말 댓글을 삭제하시겠습니까?"
        text2="삭제한 댓글은 복구할 수 없습니다."
        type="warn"
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false);
          onDelete();
        }}
      />
    </Wrapper>
  );
}

const AcceptedBox = styled.div`
  display: flex;
  width: 320px;
  padding: var(--space-20, 20px);
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #fff;
  color: var(--gray-700, #504a4c);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const AcceptButton = styled(Button)`
  && {
    width: 100%;
    height: 44px;
    margin-top: 4px;
    border-radius: var(--radius-full, 999999px);
    border: 2px solid var(--pink-p3, #dfafaf);
    background: var(--pink-p2, #ffd0d0);
  }

  && span {
    font-size: var(--typo-body-medium, 16px);
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Delete = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  color: var(--color-sys-error, #e54d4d);

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Username = styled.div`
  color: var(--color-gray-1000, #000);

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Wrapper = styled.div`
  display: flex;
  padding: var(--space-12, 12px);
  flex-direction: column;
  align-items: flex-start;
  width: 316px;
  gap: 10px;
  align-self: stretch;
  border-radius: var(--radius-sm, 6px);
  border: 1px solid var(--gray-400, #d0cccc);
  background: #fff;
`;
