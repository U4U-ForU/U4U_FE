"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/src/shared/ui/Header";
import RoomDetail from "@/src/features/deal/ui/detail/RoomDetail";
import CommentList from "@/src/features/deal/ui/detail/CommentList";
import { MOCK_COMMENTS } from "@/src/features/deal/model/detail/mockComments";
import PostMenu from "@/src/features/deal/ui/detail/PostMenu";
import Modal from "@/src/shared/ui/modal/Modal";
import { useBackTo } from "@/src/shared/lib/useBackTo";
import Page from "@/src/shared/ui/PageFrame";
import { MOCK_ROOM_DETAIL } from "@/src/features/deal/model/detail/mockRoomDetail";
import ResultModal from "@/src/shared/ui/modal/ResultModal";
import { MOCK_DEAL_ROOMS } from "@/src/features/deal/model/list/mockRooms";

export default function MyDetail() {
  return (
    <Suspense>
      <MyTradeDetail />
    </Suspense>
  );
}

function MyTradeDetail() {
  const goBack = useBackTo("/trade/list");
  const router = useRouter();
  const searchParams = useSearchParams();
  const room = MOCK_DEAL_ROOMS.find(
    ({ id }) => id === Number(searchParams.get("room")),
  );
  const title = room?.name ?? MOCK_ROOM_DETAIL.title;
  const comments = MOCK_COMMENTS;
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  const deleteComment = () => {};

  const acceptComment = () => {
    router.push("/trade/list");
  };

  return (
    <Page>
      <Global styles={dealBackground} />
      <Header title="거래 상세" onBackPress={goBack} />

      <Content>
        <RoomDetail
          title={title}
          date={MOCK_ROOM_DETAIL.date}
          writer={room?.nickname ?? MOCK_ROOM_DETAIL.writer}
          text={MOCK_ROOM_DETAIL.text}
          itemCount={room?.itemCount ?? MOCK_ROOM_DETAIL.itemCount}
          commentCount={comments.length}
          menu={
            <PostMenu
              onEdit={() =>
                router.push(
                  `/trade/edittitle?title=${encodeURIComponent(title)}`,
                )
              }
              onDelete={() => setIsDeleteOpen(true)}
            />
          }
        >
          <CommentList
            comments={comments.map((comment) => ({
              ...comment,
              isMine: false,
            }))}
            onDelete={deleteComment}
            onAccept={acceptComment}
          />
        </RoomDetail>
      </Content>

      <Modal
        title="글 삭제"
        text="정말 글을 삭제하시겠어요?"
        text2="삭제한 글은 복구할 수 없습니다."
        type="warn"
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false);
          setIsDeletedOpen(true);
        }}
      />

      <ResultModal
        isOpen={isDeletedOpen}
        title="삭제되었습니다"
        text="거래 글이 사라졌어요"
        onDone={() => router.push("/trade/list")}
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

const dealBackground = css`
  .app-background {
    background-image: url("/img/background/100.png");
  }
`;
