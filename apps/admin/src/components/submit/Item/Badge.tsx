import styled from "@emotion/styled";
import {
  STATUS_COLOR,
  STATUS_LABEL,
  toStatus,
  UNKNOWN_STATUS_COLOR,
} from "./ItemType";

interface BadgeProps {
  status: string;
}

export default function Badge({ status }: BadgeProps) {
  const known = toStatus(status);

  return (
    <BadgeWrapper $color={known ? STATUS_COLOR[known] : UNKNOWN_STATUS_COLOR}>
      {known ? STATUS_LABEL[known] : status}
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

  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 600;
  line-height: 150%;

  display: flex;
  padding: 4px var(--space-8, 8px);
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
