import styled from "@emotion/styled";

interface BadgeProps {
  text: string;
}

export default function Badge({ text }: BadgeProps) {
  return <BadgeWrapper>{text}</BadgeWrapper>;
}

const BadgeWrapper = styled.div`
  color: white;
  border-radius: var(--radius-full, 999999px);
  border: 1px solid var(--color-gray-0, #fff);
  background: var(--gray-500, #b3aeaf);
  position: absolute;
  left: 31px;
  top: 15px;

  /* body/body-xsmall-bold */
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 18px */

  display: flex;
  padding: 4px var(--space-8, 8px);
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
