import styled from "@emotion/styled";
import Image from "next/image";

interface ItemProps {
  name: string;
  onClick: () => void;
}

export default function Item({ name, onClick }: ItemProps) {
  return (
    <Wrapper type="button" onClick={onClick}>
      <Image
        src={"/tempImg/itemImg/itemImg.svg"}
        width={136}
        height={136}
        alt="아이템 이미지"
      />
      <ItemName>{name}</ItemName>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  padding: 0 12px;
  border: none;
  background: none;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  width: 160px;
  height: 197px;
  gap: 7px;
`;

const ItemName = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  overflow-wrap: anywhere;
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
`;
