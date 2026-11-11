"use client";

import styled from "@emotion/styled";
import Menu from "./header/Menu";
import Image from "next/image";

export default function Header() {
  return (
    <Wrapper>
      <Image src={"/logo/logo.png"} width={123} height={55} alt="로고" />
      <Menu />
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
