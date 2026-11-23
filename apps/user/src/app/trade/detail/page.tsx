"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import Button from "@/src/shared/ui/Button";
import RoomDetail from "@/src/features/deal/ui/detail/RoomDetail";
import CommentList from "@/src/features/deal/ui/detail/CommentList";
import CommentInput from "@/src/features/deal/ui/detail/CommentInput";
import ItemPickerSheet from "@/src/features/deal/ui/detail/ItemPickerSheet";
import type { InventoryItem } from "@/src/entities/item/model/types";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_COMMENTS } from "@/src/features/deal/model/detail/mockComments";

const MAX_SELECTED_ITEMS = 10;

export default function Detail() {
  const router = useRouter();
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isProposing, setIsProposing] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<InventoryItem[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProposing) return;

    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isProposing, selectedItems.length]);

  const removeItem = (index: number) =>
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));

  const deleteComment = (id: number) =>
    setComments((prev) => prev.filter((comment) => comment.id !== id));

  const startProposing = () => {
    setIsProposing(true);
    setIsSheetOpen(true);
  };

  const addItem = (item: InventoryItem) =>
    setSelectedItems((prev) =>
      prev.length >= MAX_SELECTED_ITEMS ? prev : [...prev, item],
    );

  return (
    <Page>
      <Global styles={dealBackground} />
      <Header
        title="거래 상세 "
        onBackPress={() => router.push("/deal/list")}
      />

      <Content>
        <RoomDetail
          title="(방이름들감) 거래하실부운~ㅎ"
          date="2026.09.18"
          writer="maremare"
          text="여기 8개 아이템 거래하실 분 있으신가여
              몆개는 조합해서 얻은거라서 좀 희귀한 거랑 거래하고 싶어요...
              사실 별생각없구요 거래댓 많이 달아주세염"
          commentCount={comments.length}
        >
          {isProposing && !isSheetExpanded && (
            <InputAnchor ref={inputRef}>
              <CommentInput
                items={selectedItems}
                onOpenPicker={() => setIsSheetOpen(true)}
                onRemove={isSheetOpen ? removeItem : undefined}
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
    </Page>
  );
}

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 22px 11px 0;
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

const Page = styled.div`
  display: flex;
  height: 100dvh;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  flex-direction: column;
`;
