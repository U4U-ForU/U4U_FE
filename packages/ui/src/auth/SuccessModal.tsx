"use client";

import styled from "@emotion/styled";
import Button from "../Button";
import { useDialogFocus } from "./useDialogFocus";

interface SuccessModalProps {
  onConfirm: () => void;
}

export default function SuccessModal({ onConfirm }: SuccessModalProps) {
  const { ref, handleKeyDown } = useDialogFocus(onConfirm);

  return (
    <Backdrop>
      <Wrapper
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-success-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <Text id="signup-success-title">회원가입에 성공했습니다</Text>
        <ConfirmButton
          text="확인"
          fontColor="#FFF"
          backgroundColor="#FFD3D3"
          borderColor="#DFAFAF"
          fontBorderColor="#C57373"
          boxShadow={false}
          onClick={onConfirm}
        />
      </Wrapper>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  padding: 20px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.4);
`;

const Wrapper = styled.div`
  display: flex;
  width: 287px;
  margin: auto;
  padding: 32px 24px 24px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  border-radius: 12px;
  border: 2px solid var(--pink-p1, #ffe7e7);
  background: #fff;

  &:focus {
    outline: none;
  }
`;

const Text = styled.p`
  margin: 0;
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const ConfirmButton = styled(Button)`
  && {
    width: 100%;
    height: 56px;
  }
`;
