"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

interface DropDownProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

export default function DropDown<T extends string>({
  options,
  value,
  onChange,
}: DropDownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapperr>
      <Wrapper>
        <Trigger
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Option>{value}</Option>
          <Icon>
            <Image
              src="/img/dropdown/icon/UI_actions/Vector.svg"
              width={24}
              height={24}
              alt=""
            />
          </Icon>
        </Trigger>

        {isOpen && (
          <List role="listbox">
            {options.map((option) => (
              <Item
                key={option}
                type="button"
                role="option"
                aria-selected={value === option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </Item>
            ))}
          </List>
        )}
      </Wrapper>
    </Wrapperr>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  min-width: 131px;
`;

const Wrapperr = styled.div`
  display: flex;
  margin-top: var(--space-16, 16px);
  width: 100%;
  max-width: 393px;
  padding: var(--space-16, 16px) 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
`;

const Trigger = styled.button`
  display: flex;
  padding: 8px 12px 8px 20px;
  gap: 10px;
  align-self: stretch;
  border-radius: var(--radius-md, 12px);
  border: 2px solid var(--color-gray-500, #adb5bd);
  background: #fff;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const Option = styled.div`
  color: var(--color-gray-700, #495057);
  text-align: center;
  white-space: nowrap;
  font-family: "Cafe24 Ssurround";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;

const Icon = styled.div``;

const List = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  width: max-content;
  border-radius: 12px;
  border: 2px solid var(--color-gray-500, #adb5bd);
  background: #fff;
  overflow: hidden;
`;

const Item = styled.button`
  border: none;
  background: #fff;
  color: var(--color-gray-700, #495057);
  text-align: left;
  white-space: nowrap;
  font-family: "Cafe24 Ssurround";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  cursor: pointer;
  display: flex;
  padding: var(--space-8, 8px) var(--space-20, 20px);
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;
