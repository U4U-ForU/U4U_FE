"use client";

import styled from "@emotion/styled";
import type { SubmitStatus } from "../model/types";
import SubmitStatusBadge from "./SubmitStatusBadge";
import { useItemImage } from "@/src/shared/lib/useItemImage";

interface SubmitItemProps {
  status: SubmitStatus;
  itemName: string;
  imageUrl: string;
  onClick: () => void;
}

export default function SubmitItem({
  status,
  itemName,
  imageUrl,
  onClick,
}: SubmitItemProps) {
  const image = useItemImage(imageUrl);

  return (
    <Wrapper type="button" onClick={onClick}>
      <Status status={status} />
      <Img src={image.src} alt="" onError={image.onError} />
      <ItemName>{itemName}</ItemName>
    </Wrapper>
  );
}

const Status = styled(SubmitStatusBadge)`
  margin-bottom: -16px;
  margin-left: -12px;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.button`
  display: block;
  width: 136px;
  height: 197px;
  margin: 0px 12px;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Img = styled.img`
  display: flex;
  height: 136px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  aspect-ratio: 1/1;
`;

const ItemName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  height: 28.8px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  text-overflow: ellipsis;
  word-break: keep-all;
  overflow-wrap: anywhere;
  font-family: "Cafe24 Ssurround";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  width: 136px;
  margin-top: 7px;
`;
