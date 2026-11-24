"use client";

import styled from "@emotion/styled";
import { Button } from "@u4u/ui";
import Image from "next/image";
import CloseButton from "@/src/shared/ui/CloseButton";
import ItemCountBadge from "./ItemCountBadge";
import { ItemModalProps } from "../model/types";

export default function ItemModal({
  maker,
  onClose,
  img,
  itemName,
  itemCount,
  itemDescription,
  ButtonText,
  onButtonClick,
  showCloseButton = true,
}: ItemModalProps) {
  const hasTopArea = Boolean(maker) || showCloseButton;

  return (
    <Wrapper $hasTopArea={hasTopArea}>
      {hasTopArea && (
        <Top>
          <CloseButtonSpacer />
          {maker ? <MadeBy>@{maker}</MadeBy> : <span />}
          {showCloseButton ? (
            <CloseButton onClick={onClose} />
          ) : (
            <CloseButtonSpacer />
          )}
        </Top>
      )}
      <ImageArea>
        {itemCount ? <OverlapBadge count={itemCount} /> : null}
        <Image src={img} width={235} height={235} alt="아이템 이미지" />
      </ImageArea>
      <ItemName>{itemName}</ItemName>
      <ItemDes $isExpanded={!maker}>{itemDescription}</ItemDes>
      <TradeButton
        text={ButtonText}
        onClick={onButtonClick}
        fontColor="#fff"
        fontBorderColor="#A75959"
        backgroundColor="#FFD0D0"
        borderColor="#DFAFAF"
        boxShadow={false}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $hasTopArea: boolean }>`
  display: flex;
  width: 287px;
  height: 500px;
  padding: 12px 24px;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ $hasTopArea }) =>
    $hasTopArea ? "flex-start" : "center"};
  border-radius: 12px;
  border: 2px solid var(--pink-p1, #ffe7e7);
  background: #fff;
`;

const Top = styled.div`
  display: flex;
  width: 278px;
  height: 24px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

const CloseButtonSpacer = styled.div`
  width: 43px;
`;

const MadeBy = styled.div`
  color: var(--color-gray-600, #868e96);
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const ImageArea = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const OverlapBadge = styled(ItemCountBadge)`
  position: absolute;
  top: 12px;
  left: 12px;
`;

const ItemName = styled.div`
  margin-bottom: 4px;
  color: var(--brown-b3, #6f5e4c);
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  align-self: stretch;
  text-align: left;
`;

const ItemDes = styled.div<{ $isExpanded: boolean }>`
  margin-bottom: 16px;
  color: var(--color-gray-600, #868e96);
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  align-self: stretch;
  max-height: ${({ $isExpanded }) =>
    $isExpanded ? "calc(1.5em * 4)" : "calc(1.5em * 3)"};
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const TradeButton = styled(Button)`
  && {
    width: 235px;
  }
`;
