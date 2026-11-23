"use client";

import styled from "@emotion/styled";
import { useRef, useState, type PointerEvent } from "react";
import ItemModal from "@/src/entities/item/ui/ItemModal";
import SkipButton from "../SkipButton";
import { SkipArea } from "@/src/features/gacha/ui/SkipArea";
import ArrowButton from "../ArrowButton";
import Infomation from "../modal/Infomation";
import type { GachaItem } from "../../model/types";

interface GachaResultProps {
  items: GachaItem[];
  onSkip: () => void;
}

const MAX_STACKED_CARD = 2;
const SWIPE_THRESHOLD = 50;
const DRAG_START_THRESHOLD = 10;

export default function GachaResult({ items, onSkip }: GachaResultProps) {
  const [index, setIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const currentItem = items[index];
  const isSingleDraw = items.length === 1;
  const isFirst = index === 0;
  const isLast = index === items.length - 1;
  const stackedCount = Math.min(items.length - 1 - index, MAX_STACKED_CARD);

  const goPrev = () => {
    if (isFirst) return;

    setIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (isLast) return;

    setIndex((prev) => prev + 1);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startXRef.current = event.clientX;
    isDraggingRef.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const startX = startXRef.current;

    if (startX === null || isDraggingRef.current) return;
    if (Math.abs(event.clientX - startX) < DRAG_START_THRESHOLD) return;

    isDraggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const endPointer = () => {
    startXRef.current = null;
    isDraggingRef.current = false;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const startX = startXRef.current;

    endPointer();

    if (startX === null) return;

    const distance = event.clientX - startX;

    if (Math.abs(distance) < SWIPE_THRESHOLD) return;

    if (distance < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <Wrapper>
      <SkipArea>
        <SkipButton onClick={onSkip} />
      </SkipArea>

      <InfomationArea>
        <Infomation />
      </InfomationArea>

      <Deck>
        <ArrowButton
          direction="prev"
          label="이전 아이템 보기"
          onClick={goPrev}
          disabled={isFirst}
        />

        <CardArea
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={endPointer}
          onDragStart={(event) => event.preventDefault()}
        >
          {Array.from({ length: stackedCount }, (_, stackIndex) => (
            <StackedCard key={stackIndex} $depth={stackedCount - stackIndex} />
          ))}

          <FrontCard $tilted={!isSingleDraw}>
            <ItemModal
              img={currentItem.imageUrl}
              itemName={currentItem.name}
              itemDescription={currentItem.description}
              ButtonText={
                !isLast ? "다음" : isSingleDraw ? "뽑기 완료" : "결과 보기"
              }
              onClose={onSkip}
              onButtonClick={isLast ? onSkip : goNext}
              showCloseButton={false}
            />
          </FrontCard>
        </CardArea>

        <ArrowButton
          direction="next"
          label="다음 아이템 보기"
          onClick={goNext}
          disabled={isLast}
        />
      </Deck>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const InfomationArea = styled.div`
  margin-top: 24px;
`;

const Deck = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: 4px;
`;

const CardArea = styled.div`
  position: relative;
  width: 287px;
  height: 500px;
  flex-shrink: 0;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-drag: none;
`;

const StackedCard = styled.div<{ $depth: number }>`
  position: absolute;
  inset: 0;
  border-radius: 12px;
  border: 2px solid var(--pink-p1, #ffe7e7);
  background: #fff;
  opacity: ${({ $depth }) => 1 - $depth * 0.15};
`;

const FrontCard = styled.div<{ $tilted: boolean }>`
  position: relative;
  z-index: 1;
  transform: ${({ $tilted }) => ($tilted ? "rotate(3deg)" : "none")};
`;
