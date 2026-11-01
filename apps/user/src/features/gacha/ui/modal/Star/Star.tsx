"use client";

import styled from "@emotion/styled";
import Image from "next/image";

interface StarProps {
  count: number;
  type?: "button" | "submit";
  fontColor: string;
  backgroundColor: string;
  borderColor?: string;
  fontBorderColor?: string;
  boxShadow?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  state: "before" | "after";
}

export default function Star({
  count,
  type = "button",
  fontColor,
  backgroundColor,
  borderColor,
  fontBorderColor,
  boxShadow = true,
  onClick,
  disabled = false,
  className,
  state,
}: StarProps) {
  const isInteractive = Boolean(onClick);

  return (
    <Wrapper
      as={isInteractive ? "button" : "span"}
      type={isInteractive ? type : undefined}
      className={className}
      onClick={onClick}
      disabled={isInteractive ? disabled : undefined}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $boxShadow={boxShadow}
      $isInteractive={isInteractive}
    >
      <Image
        src={
          state === "after" ? "/img/Gacha/StarAfter.svg" : "/img/Gacha/Star.svg"
        }
        alt="별 개수"
        width={16}
        height={16}
      />
      <Text $fontColor={fontColor} $fontBorderColor={fontBorderColor}>
        {count}
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.button<{
  $backgroundColor: string;
  $borderColor?: string;
  $boxShadow?: boolean;
  $isInteractive: boolean;
}>`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: fit-content;
  height: 36px;
  flex-shrink: 0;
  border-radius: var(--radius-full, 999999px);
  border: 2px solid ${({ $borderColor }) => $borderColor ?? "transparent"};
  background: ${({ $backgroundColor }) => $backgroundColor};
  cursor: ${({ $isInteractive }) => ($isInteractive ? "pointer" : "default")};
  transition: opacity 0.15s ease;
  box-shadow: ${({ $boxShadow }) =>
    $boxShadow
      ? "0 4px 6px 0 var(--color-opacity-black-15, rgba(0, 0, 0, 0.15))"
      : "none"};
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Text = styled.span<{
  $fontColor: string;
  $fontBorderColor?: string;
}>`
  font-family: "Cafe24 Ssurround", sans-serif;
  color: ${({ $fontColor }) => $fontColor};
  -webkit-text-stroke: ${({ $fontBorderColor }) =>
    $fontBorderColor ? `4px ${$fontBorderColor}` : "0"};
  paint-order: stroke fill;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: -1px;
  white-space: nowrap;
`;
