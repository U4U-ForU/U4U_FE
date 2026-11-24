"use client";

import styled from "@emotion/styled";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Page>
      <Background aria-hidden="true" />
      <Content>{children}</Content>
    </Page>
  );
}

const Page = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-height: 100dvh;
  padding: 48px 24px;
  justify-content: center;
  align-items: center;
  background-color: #ffe4e4;
  font-family: Pretendard, "Apple SD Gothic Neo", system-ui, sans-serif;
`;

const Background = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image: url("/background/50.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  max-width: 440px;
  flex-direction: column;
`;
