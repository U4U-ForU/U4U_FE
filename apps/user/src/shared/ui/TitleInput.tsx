"use client";

import styled from "@emotion/styled";

interface TitleInputProps {
  label: string;
  placeholder?: string;
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
}

export default function TitleInput({
  label,
  placeholder,
  maxLength,
  value,
  onChange,
}: TitleInputProps) {
  const count = Math.min(value.length, maxLength);

  return (
    <Wrapper>
      <Field
        type="text"
        aria-label={label}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, maxLength))}
      />
      <Counter $isFull={count >= maxLength}>
        {count} / {maxLength}
      </Counter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-self: stretch;
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

const Field = styled.input`
  display: flex;
  height: 48px;
  padding: 0 var(--number-16, 16px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: var(--number-6, 6px);
  background: var(--color-gray-0, #fff);
  outline: none;
  border: none;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */

  ::placeholder {
    color: #b3aeaf;
  }
`;
