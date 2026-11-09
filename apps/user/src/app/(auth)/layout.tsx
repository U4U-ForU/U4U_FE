"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { BOTTOM_AREA_HEIGHT } from "@/src/features/signup/ui/BottomArea";
import AuthGuard from "@/src/shared/ui/AuthGuard";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Global styles={lockScroll} />
      <AuthGuard requireAuth={false} redirectTo="/main">
        <Wrapper>{children}</Wrapper>
      </AuthGuard>
    </>
  );
}

const lockScroll = css`
  body {
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 100dvh;
  padding: calc(40px + env(safe-area-inset-top)) 20px
    calc(${BOTTOM_AREA_HEIGHT}px + 24px + env(safe-area-inset-bottom));
  flex-direction: column;
`;
