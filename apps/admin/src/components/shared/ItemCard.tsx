import styled from "@emotion/styled";
import Image from "next/image";
import type { ButtonHTMLAttributes } from "react";

interface ItemCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  imageSize: number;
  width: number;
  height: number;
}

export default function ItemCard({
  name,
  imageSize,
  width,
  height,
  ...buttonProps
}: ItemCardProps) {
  return (
    <Wrapper type="button" $width={width} $height={height} {...buttonProps}>
      <Image
        src={"/tempImg/itemImg/itemImg.svg"}
        width={imageSize}
        height={imageSize}
        alt="아이템 이미지"
        draggable={false}
      />
      <ItemName>{name}</ItemName>
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $width: number; $height: number }>`
  display: flex;
  padding: 0 12px;
  border: none;
  background: none;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
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
