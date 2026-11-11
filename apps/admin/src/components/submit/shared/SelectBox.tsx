import styled from "@emotion/styled";

type SelectBoxProps = { onClick?: () => void; width?: number } & (
  | { type: keyof typeof TYPE_COLORS; modalType?: never }
  | { modalType: keyof typeof MODAL_TYPE_COLORS; type?: never }
);

export const TYPE_COLORS = {
  거절: { border: "#A06D6D", background: "#E26C7A" },
  승인: { border: "#478769", background: "#50AB80" },
  "조합 등록": { border: "#5C87A0", background: "#69ADD4" },
  등록: { border: "#5C87A0", background: "#69ADD4" },
  취소: { border: "#D0CCCC", background: "#F9F8F8" },
  삭제: { border: "#A06D6D", background: "#E26C7A" },
};

const MODAL_TYPE_COLORS = {
  수정: { border: "#5C87A0", background: "#69ADD4" },
  삭제: { border: "#A06D6D", background: "#E26C7A" },
};

export default function SelectBox({
  type,
  modalType,
  onClick,
  width,
}: SelectBoxProps) {
  const colors = modalType ? MODAL_TYPE_COLORS[modalType] : TYPE_COLORS[type];

  return (
    <Block
      type="button"
      $colors={colors}
      $width={width ?? (modalType ? 263 : 170)}
      onClick={onClick}
    >
      {modalType ?? type}
    </Block>
  );
}

const Block = styled.button<{
  $colors: { border: string; background: string };
  $width: number;
}>`
  display: flex;
  cursor: pointer;
  width: ${({ $width }) => $width}px;
  height: 64px;
  padding: var(--space-12, 12px) var(--space-24, 24px);
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--radius-md, 12px);
  color: var(--color-gray-0, #fff);
  -webkit-text-stroke-width: 4px;
  paint-order: stroke fill;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;

  border: 2px solid ${({ $colors }) => $colors.border};
  background: ${({ $colors }) => $colors.background};
  -webkit-text-stroke-color: ${({ $colors }) => $colors.border};
`;
