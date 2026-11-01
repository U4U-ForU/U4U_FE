"use client";

import styled from "@emotion/styled";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import Button from "@/src/shared/ui/Button";
import { outerTextStroke } from "@/src/shared/lib/textStroke";

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  type: "warn" | "confirm";
  title: string;
  text: string;
  text2: string;
  confirmText?: string;
}

const CONFIRM_COLORS = {
  warn: {
    background: "#E26C7A",
    border: "#A75959",
    fontBorder: "#9E2F2F",
  },
  confirm: {
    background: "#FFD0D0",
    border: "#DFAFAF",
    fontBorder: "#A75959",
  },
} as const;

export default function Modal({
  isOpen,
  onCancel,
  onConfirm,
  type,
  title,
  text,
  text2,
  confirmText = "삭제",
}: ModalProps) {
  const colors = CONFIRM_COLORS[type];

  return (
    <ModalParent isOpen={isOpen} onClose={onCancel}>
      <Wrapper>
        <Top>
          <Title
            data-text={title}
            role="heading"
            aria-level={2}
            aria-label={title}
          >
            {title}
          </Title>
          <TextWrapper>
            <Text>{text}</Text>
            <Text>{text2}</Text>
          </TextWrapper>
        </Top>
        <ButtonWrapper>
          <Button
            text="취소"
            fontColor="#B3AEAF"
            backgroundColor="#F9F8F8"
            borderColor="#D0CCCC"
            boxShadow={false}
            onClick={onCancel}
          />
          <Button
            text={confirmText}
            fontColor="white"
            fontBorderColor={colors.fontBorder}
            backgroundColor={colors.background}
            borderColor={colors.border}
            boxShadow={false}
            onClick={onConfirm}
          />
        </ButtonWrapper>
      </Wrapper>
    </ModalParent>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 320px;
  padding: var(--space-20, 20px);
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 240px;
  box-sizing: border-box;
  border-radius: 12px;
  background: #fff;
`;

const Title = styled.div`
  text-align: center;
  white-space: pre-line;
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  margin-bottom: 4px;

  ${outerTextStroke(
    "var(--color-gray-0, #fff)",
    "var(--pink-p3, #dfafaf)",
    "4px",
  )}
`;

const TextWrapper = styled.div``;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.div`
  color: var(--gray-600, #8e8889);
  text-align: center;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;
