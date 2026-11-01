"use client";

import styled from "@emotion/styled";
import { FOCUSABLE_SELECTOR } from "@/src/shared/ui/modal/ModalParent";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

type SnapPoint = "half" | "full";

export const SNAP_OFFSET: Record<SnapPoint, number> = { half: 45, full: 0 };
export const SHEET_HALF_HEIGHT_DVH = 100 - 45;
const CLOSE_OFFSET = 70;

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onExpandedChange?: (isExpanded: boolean) => void;
  children: ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  onExpandedChange,
  children,
}: BottomSheetProps) {
  const [snap, setSnap] = useState<SnapPoint>("half");
  const [dragOffset, setDragOffset] = useState<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const onExpandedChangeRef = useRef(onExpandedChange);

  useEffect(() => {
    onCloseRef.current = onClose;
    onExpandedChangeRef.current = onExpandedChange;
  });

  const updateSnap = useCallback((next: SnapPoint) => {
    setSnap(next);
    onExpandedChangeRef.current?.(next === "full");
  }, []);

  const closeSheet = useCallback(() => {
    updateSnap("half");
    onCloseRef.current();
  }, [updateSnap]);

  const [wasOpen, setWasOpen] = useState(isOpen);

  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);

    if (!isOpen) setSnap("half");
  }

  useEffect(() => {
    if (isOpen) return;

    onExpandedChangeRef.current?.(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const sheet = sheetRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    (sheet?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? sheet)?.focus();

    return () => previouslyFocused?.focus?.();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      closeSheet();
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, closeSheet]);

  const toPercent = (px: number) => (px / window.innerHeight) * 100;

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startYRef.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const startY = startYRef.current;

    if (startY === null) return;

    const moved = toPercent(event.clientY - startY);

    setDragOffset(Math.max(SNAP_OFFSET.full, SNAP_OFFSET[snap] + moved));
  };

  const handlePointerUp = () => {
    const offset = dragOffset;

    startYRef.current = null;
    setDragOffset(null);

    if (offset === null) return;

    if (offset > CLOSE_OFFSET) {
      closeSheet();

      return;
    }

    const middle = (SNAP_OFFSET.full + SNAP_OFFSET.half) / 2;

    updateSnap(offset < middle ? "full" : "half");
  };

  const offset = dragOffset ?? SNAP_OFFSET[snap];

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={closeSheet} />
      <Sheet
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        inert={!isOpen}
        $offset={isOpen ? offset : 100}
        $isDragging={dragOffset !== null}
      >
        <HandleArea
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <Handle />
        </HandleArea>
        <Content>{children}</Content>
      </Sheet>
    </>
  );
}

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: transparent;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;

const Sheet = styled.div<{ $offset: number; $isDragging: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 102;
  display: flex;
  height: 100dvh;
  flex-direction: column;
  border-radius: 20px 20px 0 0;
  background: #fff;
  box-shadow: 0 -4px 12px 0 var(--color-opacity-black-15, rgba(0, 0, 0, 0.15));
  transform: translateY(${({ $offset }) => $offset}dvh);
  transition: ${({ $isDragging }) =>
    $isDragging ? "none" : "transform 0.25s ease"};
  touch-action: none;
`;

const HandleArea = styled.div`
  display: flex;
  padding: 12px 0;
  justify-content: center;
  flex-shrink: 0;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: var(--radius-full, 999999px);
  background: var(--gray-400, #d0cccc);
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
`;
