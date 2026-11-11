import styled from "@emotion/styled";

interface BadgeProps {
  text: string;
}

const BADGE_COLORS: Record<string, string> = {
  "심사 중": "#b3aeaf",
  "승인 완료": "#50ab80",
  "조합 처리 완료": "#69add4",
  거절됨: "#e26c7a",
  취소됨: "#8e8889",
};

export default function Badge({ text }: BadgeProps) {
  return (
    <BadgeWrapper $color={BADGE_COLORS[text] ?? "#b3aeaf"}>
      {text === "심사 중" ? "승인 전" : text}
    </BadgeWrapper>
  );
}

const BadgeWrapper = styled.div<{ $color: string }>`
  color: white;
  border-radius: var(--radius-full, 999999px);
  border: 1px solid var(--color-gray-0, #fff);
  background: ${({ $color }) => $color};
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
