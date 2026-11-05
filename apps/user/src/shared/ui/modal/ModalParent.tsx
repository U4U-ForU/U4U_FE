"use client";

import styled from "@emotion/styled";
import { useEffect, useRef, type ReactNode } from "react";

export const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalParentProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export default function ModalParent({
  isOpen,
  children,
  onClose,
}: ModalParentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    const content = contentRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        content?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
      );

    (focusables()[0] ?? content)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();

      if (items.length === 0) {
        event.preventDefault();
        content?.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const isInside = content?.contains(active) ?? false;

      if (event.shiftKey && (active === first || !isInside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !isInside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Backdrop>
      <Content ref={contentRef} role="dialog" aria-modal="true" tabIndex={-1}>
        {children}
      </Content>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
`;

const Content = styled.div`
  position: relative;
  margin: auto;

  &:focus {
    outline: none;
  }
`;
