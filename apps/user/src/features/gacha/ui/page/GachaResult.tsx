"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
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

type SlideDirection = "next" | "prev";

type SwipeAxis = "undecided" | "horizontal" | "vertical";

interface LeavingCardState {
  item: GachaItem;
  label: string;
  direction: SlideDirection;
}

const MAX_STACKED_CARD = 1;
const FLY_MS = 200;
const RISE_MS = 300;
const RISE_DELAY_MS = 90;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const STACK_GAP = 16;
const STACK_SHRINK = 0.05;
const STACK_RESERVE = 16;

const STACK_STEP = (depth: number) =>
  `translateY(${-STACK_GAP * depth}px) scale(${1 - STACK_SHRINK * depth})`;
const SWIPE_THRESHOLD = 50;

const noop = () => {};
const DRAG_START_THRESHOLD = 10;

export default function GachaResult({ items, onSkip }: GachaResultProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>("next");
  const [leaving, setLeaving] = useState<LeavingCardState | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const axisRef = useRef<SwipeAxis>("undecided");

  const currentItem = items[index];
  const isSingleDraw = items.length === 1;
  const isFirst = index === 0;
  const isLast = index === items.length - 1;
  const stackedCount = Math.min(items.length - 1 - index, MAX_STACKED_CARD);

  const buttonLabel = !isLast
    ? "다음"
    : isSingleDraw
      ? "뽑기 완료"
      : "결과 보기";

  const slideTo = (nextDirection: SlideDirection) => {
    setDirection(nextDirection);
    setLeaving({
      item: currentItem,
      label: buttonLabel,
      direction: nextDirection,
    });
    setIndex((prev) => (nextDirection === "next" ? prev + 1 : prev - 1));
  };

  const goPrev = () => {
    if (isFirst) return;

    slideTo("prev");
  };

  const goNext = () => {
    if (isLast) return;

    slideTo("next");
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startRef.current = { x: event.clientX, y: event.clientY };
    axisRef.current = "undecided";
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = startRef.current;

    if (start === null || axisRef.current !== "undecided") return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;

    if (
      Math.max(Math.abs(distanceX), Math.abs(distanceY)) < DRAG_START_THRESHOLD
    )
      return;

    if (Math.abs(distanceX) <= Math.abs(distanceY)) {
      axisRef.current = "vertical";

      return;
    }

    axisRef.current = "horizontal";
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const endPointer = () => {
    startRef.current = null;
    axisRef.current = "undecided";
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = startRef.current;
    const axis = axisRef.current;

    endPointer();

    if (start === null || axis === "vertical") return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;

    if (Math.abs(distanceX) < SWIPE_THRESHOLD) return;
    if (Math.abs(distanceX) <= Math.abs(distanceY)) return;

    if (distanceX < 0) {
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
            <CardSlide key={index} $direction={direction}>
              <ItemModal
                img={currentItem.imageUrl}
                itemName={currentItem.name}
                itemDescription={currentItem.description}
                ButtonText={buttonLabel}
                onClose={onSkip}
                onButtonClick={isLast ? onSkip : goNext}
                showCloseButton={false}
              />
            </CardSlide>
          </FrontCard>

          {leaving && (
            <LeavingCard
              $tilted={!isSingleDraw}
              $direction={leaving.direction}
              aria-hidden="true"
            >
              <CardFly
                $direction={leaving.direction}
                onAnimationEnd={() => setLeaving(null)}
              >
                <ItemModal
                  img={leaving.item.imageUrl}
                  itemName={leaving.item.name}
                  itemDescription={leaving.item.description}
                  ButtonText={leaving.label}
                  onClose={noop}
                  onButtonClick={noop}
                  showCloseButton={false}
                />
              </CardFly>
            </LeavingCard>
          )}
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
  margin-top: ${STACK_RESERVE}px;
  width: 287px;
  height: 500px;
  flex-shrink: 0;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-drag: none;

  img {
    -webkit-user-drag: none;
  }
`;

const StackedCard = styled.div<{ $depth: number }>`
  position: absolute;
  inset: 0;
  border-radius: 12px;
  border: 2px solid var(--pink-p1, #ffe7e7);
  background: #fff;
  opacity: ${({ $depth }) => Math.max(0.35, 1 - $depth * 0.07)};
  transform-origin: top center;
  transform: ${({ $depth }) => STACK_STEP($depth)};
  transition:
    transform ${RISE_MS}ms ${EASE},
    opacity ${RISE_MS}ms ${EASE};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const FrontCard = styled.div<{ $tilted: boolean }>`
  position: relative;
  z-index: 1;
  transform: ${({ $tilted }) => ($tilted ? "rotate(3deg)" : "none")};
`;

const LeavingCard = styled.div<{
  $tilted: boolean;
  $direction: SlideDirection;
}>`
  position: absolute;
  inset: 0;
  z-index: ${({ $direction }) => ($direction === "next" ? 2 : 0)};
  pointer-events: none;
  transform: ${({ $tilted }) => ($tilted ? "rotate(3deg)" : "none")};
`;

const riseFromStack = keyframes`
  from {
    opacity: 0.6;
    transform: ${STACK_STEP(1)};
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const flyOffRight = keyframes`
  to {
    opacity: 0;
    transform: translateX(115%) rotate(10deg);
  }
`;

const returnFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-110%) rotate(-10deg);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const sinkIntoStack = keyframes`
  to {
    opacity: 0;
    transform: ${STACK_STEP(1)};
  }
`;

const CardSlide = styled.div<{ $direction: SlideDirection }>`
  transform-origin: top center;
  animation: ${({ $direction }) =>
      $direction === "next" ? riseFromStack : returnFromLeft}
    ${RISE_MS}ms ${EASE} ${RISE_DELAY_MS}ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const CardFly = styled.div<{ $direction: SlideDirection }>`
  transform-origin: top center;
  animation: ${({ $direction }) =>
      $direction === "next" ? flyOffRight : sinkIntoStack}
    ${FLY_MS}ms ease-in forwards;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1ms;
  }
`;
