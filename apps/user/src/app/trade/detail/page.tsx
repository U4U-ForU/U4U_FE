"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import { Button } from "@u4u/ui";
import RoomDetail from "@/src/features/deal/ui/detail/RoomDetail";
import CommentList from "@/src/features/deal/ui/detail/CommentList";
import CommentInput from "@/src/features/deal/ui/detail/CommentInput";
import ItemPickerSheet from "@/src/features/deal/ui/detail/ItemPickerSheet";
import { SHEET_HALF_HEIGHT_DVH } from "@/src/shared/ui/BottomSheet";
import type { InventoryItem } from "@/src/entities/item/model/types";
import { Suspense, useEffect, useRef, useState } from "react";
import { MOCK_COMMENTS } from "@/src/features/deal/model/detail/mockComments";
import { useBackTo } from "@/src/shared/lib/useBackTo";
import { useSearchParams } from "next/navigation";
import Page from "@/src/shared/ui/PageFrame";
import ResultModal from "@/src/shared/ui/modal/ResultModal";
import ConfirmModal from "@/src/shared/ui/modal/Modal";
import { MOCK_ROOM_DETAIL } from "@/src/features/deal/model/detail/mockRoomDetail";
import { MOCK_DEAL_ROOMS } from "@/src/features/deal/model/list/mockRooms";

const MAX_SELECTED_ITEMS = 10;

export default function Detail() {
  return (
    <Suspense>
      <TradeDetail />
    </Suspense>
  );
}

function TradeDetail() {
  const searchParams = useSearchParams();
  const room = MOCK_DEAL_ROOMS.find(
    ({ id }) => id === Number(searchParams.get("room")),
  );
  const goBack = useBackTo(
    searchParams.get("from") === "inventory" ? "/inventory" : "/trade/list",
  );
  const comments = MOCK_COMMENTS;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isProposing, setIsProposing] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<InventoryItem[]>([]);
  const [isSendConfirmOpen, setIsSendConfirmOpen] = useState(false);
  const [isSentOpen, setIsSentOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProposing) return;

    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isProposing, isSheetOpen, selectedItems.length]);

  const removeItem = (index: number) =>
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));

  const deleteComment = () => {};

  const startProposing = () => {
    setIsProposing(true);
    setIsSheetOpen(true);
  };

  const sendProposal = () => {
    setIsSheetOpen(false);
    setIsProposing(false);
    setSelectedItems([]);
    setIsSentOpen(true);
  };

  const addItem = (item: InventoryItem) =>
    setSelectedItems((prev) =>
      prev.length >= MAX_SELECTED_ITEMS ? prev : [...prev, item],
    );

  return (
    <Page>
      <Global styles={dealBackground} />
      <Header title="거래 상세" onBackPress={goBack} />

      <Content $liftedDvh={isSheetOpen ? SHEET_HALF_HEIGHT_DVH : 0}>
        <RoomDetail
          title={room?.name ?? MOCK_ROOM_DETAIL.title}
          date={MOCK_ROOM_DETAIL.date}
          writer={room?.nickname ?? MOCK_ROOM_DETAIL.writer}
          text={MOCK_ROOM_DETAIL.text}
          itemCount={room?.itemCount ?? MOCK_ROOM_DETAIL.itemCount}
          commentCount={comments.length}
        >
          {isProposing && !isSheetExpanded && (
            <InputAnchor ref={inputRef}>
              <CommentInput
                items={selectedItems}
                onOpenPicker={() => setIsSheetOpen(true)}
                onRemove={isSheetOpen ? removeItem : undefined}
                onSend={() => setIsSendConfirmOpen(true)}
              />
            </InputAnchor>
          )}
          <CommentList comments={comments} onDelete={deleteComment} />
        </RoomDetail>
      </Content>

      <CreateButton
        text="거래 제안하기"
        fontColor="white"
        backgroundColor="#FFD0D0"
        borderColor="#DFAFAF"
        fontBorderColor="#A75959"
        boxShadow={false}
        type="button"
        onClick={startProposing}
      />

      <ItemPickerSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSelect={addItem}
        selectedItems={selectedItems}
        onExpandedChange={setIsSheetExpanded}
      />

      <ConfirmModal
        isOpen={isSendConfirmOpen}
        type="confirm"
        title={"거래 제안을 정말\n전송하시겠어요?"}
        text="전송한 제안은 수정할 수 없고,"
        text2="삭제만 할 수 있습니다."
        confirmText="전송"
        onCancel={() => setIsSendConfirmOpen(false)}
        onConfirm={() => {
          setIsSendConfirmOpen(false);
          sendProposal();
        }}
      />

      <ResultModal
        isOpen={isSentOpen}
        title="전송되었습니다"
        text="거래 제안이 등록되었어요"
        onDone={() => setIsSentOpen(false)}
      />
    </Page>
  );
}

const Content = styled.div<{ $liftedDvh: number }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 22px 11px ${({ $liftedDvh }) => $liftedDvh}dvh;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const InputAnchor = styled.div`
  align-self: stretch;
  scroll-margin-top: 80px;
`;

const CreateButton = styled(Button)`
  margin-top: auto;
  align-self: center;
`;

const dealBackground = css`
  .app-background {
    background-image: url("/img/background/100.png");
  }
`;
