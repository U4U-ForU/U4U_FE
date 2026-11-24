"use client";

import styled from "@emotion/styled";

interface InputBoxProps {
  label: string;
  placeholder: string;
  height: number;
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
}

export default function InputBox({
  label,
  placeholder,
  height,
  maxLength,
  value,
  onChange,
}: InputBoxProps) {
  const count = Math.min(value.length, maxLength);

  return (
    <Wrapper>
      <Field
        aria-label={label}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, maxLength))}
        $height={height}
      />
      <Counter $isFull={count >= maxLength}>
        {count} / {maxLength}
      </Counter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Counter = styled.span<{ $isFull: boolean }>`
  align-self: flex-end;
  color: ${({ $isFull }) =>
    $isFull ? "var(--pink-p4, #a75959)" : "var(--gray-600, #8e8889)"};
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const Field = styled.textarea<{ $height: number }>`
  outline: none;
  border: none;
  width: 100%;
  height: ${({ $height }) => $height}px;
  padding: 12px var(--number-16, 16px);
  border-radius: var(--number-6, 6px);
  background: var(--color-gray-0, #fff);
  resize: none;
  overflow-y: auto;
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  &:focus-visible {
    outline: 2px solid var(--pink-p3, #dfafaf);
    outline-offset: 2px;
  }
`;
