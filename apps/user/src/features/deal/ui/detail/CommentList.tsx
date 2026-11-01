import styled from "@emotion/styled";
import Comment from "./Comment";
import type { DealComment } from "../../model/detail/types";

interface CommentListProps {
  comments: DealComment[];
  onDelete: (id: number) => void;
  onAccept?: (id: number) => void;
}

export default function CommentList({
  comments,
  onDelete,
  onAccept,
}: CommentListProps) {
  if (comments.length === 0) return null;

  return (
    <Wrapper>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          nickname={comment.nickname}
          itemCount={comment.itemCount}
          isMine={comment.isMine}
          onDelete={() => onDelete(comment.id)}
          onAccept={onAccept ? () => onAccept(comment.id) : undefined}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 12px;
  margin-top: 20px;
`;
