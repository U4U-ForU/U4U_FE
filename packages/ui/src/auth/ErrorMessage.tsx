"use client";

import styled from "@emotion/styled";

interface ErrorMessageProps {
  text: string;
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
  if (text === "") return null;

  return <Text role="alert">{text}</Text>;
}

const Text = styled.p`
  margin: 0;
  color: var(--color-red-600, #f03e3e);
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-weight: 400;
  line-height: 150%;
`;
