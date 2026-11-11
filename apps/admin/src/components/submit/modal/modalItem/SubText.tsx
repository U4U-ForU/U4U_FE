import styled from "@emotion/styled";

interface SubTextProps {
  text: string;
}

export default function SubText({ text }: SubTextProps) {
  return <Text>{text}</Text>;
}

const Text = styled.div`
  color: var(--gray-600, #8e8889);
  text-align: center;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
