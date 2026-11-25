import Item from "./Item";
import styled from "@emotion/styled";
import type { SubmitItem } from "@/src/api/SubmitItem/type";

interface ItemListProps {
  items: SubmitItem[];
  isLoading: boolean;
  errorMessage: string;
  onItemClick: (item: SubmitItem) => void;
}

export default function ItemList({
  items,
  isLoading,
  errorMessage,
  onItemClick,
}: ItemListProps) {
  if (isLoading) return <Message>불러오는 중이에요</Message>;

  if (errorMessage) return <Message>{errorMessage}</Message>;

  if (items.length === 0) {
    return <Message>제출된 아이템이 없어요</Message>;
  }

  return (
    <Wrapper>
      {items.map((item) => (
        <Item
          key={item.submissionId}
          name={item.name}
          status={item.status}
          imageUrl={item.imageUrl}
          onClick={() => onItemClick(item)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 1200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
`;

const Message = styled.div`
  display: flex;
  width: 1200px;
  padding: 80px 0;
  justify-content: center;
  color: var(--gray-600, #8e8889);
  font-size: var(--typo-body-medium, 16px);
  font-weight: 600;
`;
