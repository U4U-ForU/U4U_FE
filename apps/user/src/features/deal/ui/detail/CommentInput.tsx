"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import type { InventoryItem } from "@/src/entities/item/model/types";

interface CommentInputProps {
  items: InventoryItem[];
  onOpenPicker: () => void;
  onRemove?: (index: number) => void;
}

export default function CommentInput({
  items,
  onOpenPicker,
  onRemove,
}: CommentInputProps) {
  const isRemovable = Boolean(onRemove);

  return (
    <Wrapper onClick={onOpenPicker}>
      <Input>
        {items.length === 0 ? (
          <Placeholder type="button">거래할 아이템을 선택하세요</Placeholder>
        ) : (
          items.map((item, index) => (
            <SelectedItem
              key={`${item.id}-${index}`}
              as={isRemovable ? "button" : "div"}
              type={isRemovable ? "button" : undefined}
              aria-label={isRemovable ? `${item.name} 빼기` : undefined}
              onClick={
                isRemovable
                  ? (event) => {
                      event.stopPropagation();
                      onRemove?.(index);
                    }
                  : undefined
              }
              $isRemovable={isRemovable}
            >
              <Image
                src="/tempImg/tempItemImg.png"
                width={44}
                height={44}
                alt=""
              />
            </SelectedItem>
          ))
        )}
      </Input>
      <Bottom>
        <Image
          src={"/img/sendButton/send.svg"}
          width={24}
          height={24}
          alt="전송버튼"
        ></Image>
      </Bottom>
    </Wrapper>
  );
}

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  align-self: stretch;
`;

const Input = styled.div`
  display: grid;
  align-content: start;
  grid-template-columns: repeat(5, 44px);
  min-height: 74px;
  gap: 8px;
  align-items: center;
  align-self: stretch;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 101;
  margin-top: 20px;
  display: flex;
  padding: var(--space-12, 12px);
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: var(--radius-sm, 6px);
  border: 1px solid var(--gray-400, #d0cccc);
  background: #fff;
`;

const Placeholder = styled.button`
  grid-column: 1 / -1;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  color: var(--gray-600, #8e8889);
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const SelectedItem = styled.button<{ $isRemovable: boolean }>`
  display: flex;
  padding: 0;
  flex-shrink: 0;
  border: none;
  background: transparent;
  cursor: ${({ $isRemovable }) => ($isRemovable ? "pointer" : "default")};
  -webkit-tap-highlight-color: transparent;
`;
