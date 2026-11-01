"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/src/shared/ui/Header";
import RoomDetail from "@/src/features/deal/ui/detail/RoomDetail";
import CommentList from "@/src/features/deal/ui/detail/CommentList";
import { MOCK_COMMENTS } from "@/src/features/deal/model/detail/mockComments";
import PostMenu from "@/src/features/deal/ui/detail/PostMenu";
import Modal from "@/src/shared/ui/modal/Modal";

export default function MyDetail() {
  const router = useRouter();
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteComment = (id: number) =>
    setComments((prev) => prev.filter((comment) => comment.id !== id));

  const acceptComment = (id: number) =>
    setComments((prev) => prev.filter((comment) => comment.id !== id));

  return (
    <Page>
      <Global styles={dealBackground} />
      <Header title="거래 상세" onBackPress={() => router.push("/deal/list")} />

      <Content>
        <RoomDetail
          title="(방이름들감) 거래하실부운~ㅎ"
          date="2026.09.18"
          writer="maremare"
          text="여기 8개 아이템 거래하실 분 있으신가여
              몆개는 조합해서 얻은거라서 좀 희귀한 거랑 거래하고 싶어요...
              사실 별생각없구요 거래댓 많이 달아주세염"
          commentCount={comments.length}
          menu={
            <PostMenu
              onEdit={() => router.push("/deal/modifytitle")}
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
        text="정말 글을 삭제하시겠습니까?"
        text2="삭제한 글은 복구할 수 없습니다."
        type="warn"
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false);
          router.push("/deal/list");
        }}
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

const Page = styled.div`
  display: flex;
  height: 100dvh;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  flex-direction: column;
`;
