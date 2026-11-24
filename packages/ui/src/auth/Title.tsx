"use client";

import styled from "@emotion/styled";

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return <Text>{text}</Text>;
}

const Text = styled.div`
  color: var(--pink-p4, #c57373);
  -webkit-text-stroke: 4px var(--color-gray-0, #fff);
  paint-order: stroke fill;
  font-family: "Cafe24 Ssurround";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
