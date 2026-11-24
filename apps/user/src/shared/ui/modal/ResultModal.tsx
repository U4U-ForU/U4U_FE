"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import { RESULT_MODAL_DURATION } from "@/src/shared/ui/modal/resultDuration";
import { outerTextStroke } from "@u4u/ui";

type ResultModalSize = "sm" | "md";

const SIZES = {
  sm: { width: 260, height: 230, paddingTop: 28, image: 128 },
  md: { width: 320, height: 300, paddingTop: 32, image: 172 },
} as const;

const IMAGE_RATIO = 158 / 172;

interface ResultModalProps {
  isOpen: boolean;
  title: string;
  text: string;
  size?: ResultModalSize;
  onDone: () => void;
}

export default function ResultModal({
  isOpen,
  title,
  text,
  size = "md",
  onDone,
}: ResultModalProps) {
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => onDoneRef.current(), RESULT_MODAL_DURATION);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const imageWidth = SIZES[size].image;

  return (
    <ModalParent isOpen={isOpen}>
      <Box role="status" $size={size}>
        <Title data-text={title}>{title}</Title>
        <Text>{text}</Text>
        <Character
          src="/img/modal.svg"
          width={imageWidth}
          height={Math.round(imageWidth * IMAGE_RATIO)}
          alt=""
        />
      </Box>
    </ModalParent>
  );
}

const Box = styled.div<{ $size: ResultModalSize }>`
  display: flex;
  width: ${({ $size }) => SIZES[$size].width}px;
  height: ${({ $size }) => SIZES[$size].height}px;
  padding-top: ${({ $size }) => SIZES[$size].paddingTop}px;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  background:
    linear-gradient(180deg, #fff 30%, rgba(255, 255, 255, 0) 70%),
    #fff url("/img/background/100.png") center / cover no-repeat;
  overflow: hidden;
`;

const Title = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;

  ${outerTextStroke(
    "var(--color-gray-0, #fff)",
    "var(--pink-p3, #A06D6D)",
    "4px",
  )}
`;

const Text = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 2px;
  color: var(--brown-p1, #a06d6d);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Character = styled(Image)`
  margin-top: auto;
`;
