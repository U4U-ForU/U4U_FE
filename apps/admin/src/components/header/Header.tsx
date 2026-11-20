"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <Wrapper>
      <Image src={"/logo/logo.png"} width={123} height={55} alt="로고" />
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  top: 0;
  position: static;
  display: flex;
  width: 100%;
  padding: var(--space-24, 24px) 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: url("/background/header_tile.png") left top / 52px auto repeat-x;
`;
