import styled from "@emotion/styled";
import Image from "next/image";
import Badge from "./Badge";
import { itemImageSrc } from "@/src/shared/lib/itemImage";

interface ItemProps {
  name: string;
  status: string;
  imageUrl?: string;
  onClick: () => void;
}

export default function Item({
  name,
  status,
  imageUrl,
  onClick,
}: ItemProps) {
  return (
    <Wrapper type="button" onClick={onClick}>
      <Badge status={status} />
      <Image
        src={itemImageSrc(imageUrl)}
        width={250}
        height={250}
        alt="아이템 이미지"
      />
      <Name>{name}</Name>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  width: 282px;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  position: relative;
`;

const Name = styled.div`
  overflow: hidden;
  color: var(--gray-1000, #000);
  text-align: center;
  text-overflow: ellipsis;
  font-family: "Cafe24 Ssurround";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
