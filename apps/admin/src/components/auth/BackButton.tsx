"use client";

import styled from "@emotion/styled";
import Image from "next/image";

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <Button type="button" aria-label="이전 단계로" onClick={onClick}>
      <Image src={"/icon/Before.svg"} width={7} height={11} alt="" />
    </Button>
  );
}

const Button = styled.button`
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--pink-p3, #dfafaf);
    outline-offset: -4px;
    border-radius: 12px;
  }
`;
