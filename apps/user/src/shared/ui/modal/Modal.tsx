"use client";

import styled from "@emotion/styled";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import { Button } from "@u4u/ui";

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  type: "warn" | "confirm";
  title: string;
  text: string;
  text2: string;
  confirmText?: string;
  confirmDisabled?: boolean;
  errorMessage?: string;
}

export const CONFIRM_COLORS = {
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
  confirmDisabled = false,
  errorMessage = "",
}: ModalProps) {
  const colors = CONFIRM_COLORS[type];

  return (
    <ModalParent
      isOpen={isOpen}
      onClose={confirmDisabled ? undefined : onCancel}
    >
      <Wrapper>
        <Top>
          <Title role="heading" aria-level={2} aria-label={title} $type={type}>
            {title}
          </Title>
          <TextWrapper>
            <Text>{text}</Text>
            <Text>{text2}</Text>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
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
            disabled={confirmDisabled}
          />
          <Button
            text={confirmText}
            fontColor="white"
            fontBorderColor={colors.fontBorder}
            backgroundColor={colors.background}
            borderColor={colors.border}
            boxShadow={false}
            onClick={onConfirm}
            disabled={confirmDisabled}
          />
        </ButtonWrapper>
      </Wrapper>
    </ModalParent>
  );
}

const ErrorText = styled.p`
  margin: 6px 0 0;
  color: #e26c7a;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 320px;
  padding: var(--space-20, 20px);
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-radius: 12px;
  background: #fff;
`;

const Title = styled.div<{ $type: ModalProps["type"] }>`
  text-align: center;
  white-space: pre-line;
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  line-height: 150%;
  margin-bottom: 4px;

  ${({ $type }) =>
    $type === "confirm"
      ? `
    color: var(--color-gray-0, #fff);
    -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: var(--brown-p1, #a06d6d);
    paint-order: stroke fill;
    font-weight: 700;
  `
      : `
    color: var(--brown-p1, #a06d6d);
    font-weight: 600;
  `}
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

  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 48px;
  gap: 12px;
  width: 100%;

  button {
    padding-left: 12px;
    padding-right: 12px;
  }

  span {
    white-space: nowrap;
  }
`;
