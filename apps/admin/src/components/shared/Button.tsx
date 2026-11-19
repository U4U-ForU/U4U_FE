"use client";

import styled from "@emotion/styled";
import { outerTextStroke } from "./textStroke";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  fontColor: string;
  backgroundColor: string;
  borderColor?: string;
  fontBorderColor?: string;
  boxShadow?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  text,
  type = "button",
  fontColor,
  backgroundColor,
  borderColor,
  fontBorderColor,
  boxShadow = true,
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <Wrapper
      type={type}
      aria-label={text}
      className={className}
      onClick={onClick}
      disabled={disabled}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $boxShadow={boxShadow}
    >
      <Text
        data-text={text}
        $fontColor={fontColor}
        $fontBorderColor={fontBorderColor}
      >
        {text}
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.button<{
  $backgroundColor: string;
  $borderColor?: string;
  $boxShadow?: boolean;
}>`
  display: flex;
  width: min(353px, calc(100% - 32px));
  height: 64px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 2px solid ${({ $borderColor }) => $borderColor ?? "transparent"};
  background: ${({ $backgroundColor }) => $backgroundColor};
  cursor: pointer;
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
  display: inline-block;
  font-family: "Cafe24 Ssurround", sans-serif;
  color: ${({ $fontColor }) => $fontColor};
  font-size: 24px;
  font-weight: 400;
  line-height: 150%;

  ${({ $fontColor, $fontBorderColor }) =>
    $fontBorderColor && outerTextStroke($fontColor, $fontBorderColor, "4px")}
`;
