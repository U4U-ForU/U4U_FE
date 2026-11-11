"use client";

import styled from "@emotion/styled";
import { useEffect, type ReactNode } from "react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalLayout({
  onClose,
  children,
}: ModalLayoutProps) {
  return (
    <Backdrop onClick={onClose}>
      <Wrapper onClick={(event) => event.stopPropagation()}>{children}</Wrapper>
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
  display: inline-flex;
  margin: auto;
  padding: var(--space-32, 32px) var(--space-48, 48px) var(--space-48, 48px)
    var(--space-48, 48px);
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: var(--radius-md, 12px);
  border: 1px solid var(--gray-300, #e0dddd);
  background: #fff;

  /* shadow/400 */
  box-shadow: 0 4px 6px 0 var(--color-opacity-black-15, rgba(0, 0, 0, 0.15));
`;
