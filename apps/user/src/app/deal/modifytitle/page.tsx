"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import { useState } from "react";

import Button from "@/src/shared/ui/Button";
import { SHEET_HALF_HEIGHT_DVH } from "@/src/shared/ui/BottomSheet";

export default function Detail() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);

  const buttonOffset = isSheetOpen ? SHEET_HALF_HEIGHT_DVH : 0;

  return (
    <Page>
      <Global styles={dealBackground} />
      <Header title="거래 제목 수정" />

      <Content>
        <Input type="text" placeholder="(원래 거래방 이름이 들어감)"></Input>
      </Content>

      <ButtonArea $offsetDvh={buttonOffset} $isHidden={isSheetExpanded}>
        <Button
          text="거래 수정하기"
          fontColor="white"
          backgroundColor="#FFD0D0"
          borderColor="#DFAFAF"
          fontBorderColor="#A75959"
          boxShadow={false}
        />
      </ButtonArea>
    </Page>
  );
}

const ButtonArea = styled.div<{ $offsetDvh: number; $isHidden: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: ${({ $offsetDvh }) => $offsetDvh}dvh;
  z-index: 103;
  display: flex;
  justify-content: center;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  pointer-events: ${({ $isHidden }) => ($isHidden ? "none" : "auto")};
  transition:
    bottom 0.25s ease,
    opacity 0.2s ease;
`;

const Input = styled.input`
  display: flex;
  height: 48px;
  padding: 0 var(--number-16, 16px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: var(--number-6, 6px);
  background: var(--color-gray-0, #fff);
  outline: none;
  border: none;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */

  ::placeholder {
    color: #b3aeaf;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 22px 11px 0;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  width: 100%;
`;

const dealBackground = css`
  .app-background {
    background-image: url("/img/background/100.png");
  }
`;

const Page = styled.div`
  display: flex;
  height: 100dvh;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  flex-direction: column;
  align-items: center;
`;
