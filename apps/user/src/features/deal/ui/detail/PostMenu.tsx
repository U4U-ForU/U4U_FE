"use client";

import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="4" cy="10" r="1.6" fill="#504A4C" />
    <circle cx="10" cy="10" r="1.6" fill="#504A4C" />
    <circle cx="16" cy="10" r="1.6" fill="#504A4C" />
  </svg>
);

interface PostMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function PostMenu({ onEdit, onDelete }: PostMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutside = (event: MouseEvent) => {
      if (wrapperRef.current?.contains(event.target as Node)) return;

      setIsOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <Wrapper ref={wrapperRef}>
      <Trigger
        type="button"
        aria-label="글 메뉴"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MoreIcon />
      </Trigger>

      {isOpen && (
        <List role="menu">
          <Item
            type="button"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
          >
            제목 수정
          </Item>
          <Item
            type="button"
            role="menuitem"
            $isDanger
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
          >
            글 삭제
          </Item>
        </List>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  align-self: flex-end;
`;

const Trigger = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const List = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 10;
  display: flex;
  padding: 4px 4px;
  width: 120px;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-sm, 6px);
  border: 1px solid var(--gray-400, #d0cccc);
  background: #fff;
  width: 100px;

  /* shadow/400 */
  box-shadow: 0 4px 6px 0 var(--color-opacity-black-15, rgba(0, 0, 0, 0.15));
`;

const Item = styled.button<{ $isDanger?: boolean }>`
  padding: 4px 0px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: center;
  color: ${({ $isDanger }) => ($isDanger ? "#E26C7A" : "#000")};

  border-top: ${({ $isDanger }) =>
    $isDanger ? "1px solid var(--gray-400, #D0CCCC);" : "none"};
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  & + & {
    border-top: 1px solid var(--gray-400, #d0cccc);
  }
`;
