import styled from "@emotion/styled";
import Image from "next/image";
import PlusIcon from "./PlusIcon";
import { NEXT_BACKGROUND, NEXT_COLOR, type SlotHighlight } from "./slotStyle";
import { useItemDrop } from "./useItemDrop";

interface ItemSlotProps {
  name: string | null;
  emptyLabel: string;
  size: number;
  plusSize?: number;
  imageAlt: string;
  highlight: SlotHighlight;
  onPick: () => void;
  onRemove: () => void;
  onDropItem: (name: string) => void;
  onOverChange: (isOver: boolean) => void;
  className?: string;
}

export default function ItemSlot({
  name,
  emptyLabel,
  size,
  plusSize = 15,
  imageAlt,
  highlight,
  onPick,
  onRemove,
  onDropItem,
  onOverChange,
  className,
}: ItemSlotProps) {
  const dropHandlers = useItemDrop(onDropItem, onOverChange);
  const filled = name !== null;

  return (
    <Wrapper className={className} {...dropHandlers}>
      <Box
        type="button"
        disabled={filled}
        onClick={onPick}
        $size={size}
        $filled={filled}
        $highlight={highlight}
        aria-label={
          name ??
          `${emptyLabel} 비어 있음${
            highlight === "none"
              ? ", 여기에 넣으려면 선택"
              : ", 다음에 채워질 칸"
          }`
        }
      >
        {filled ? (
          <Image
            src={"/tempImg/itemImg/itemImg.svg"}
            width={size}
            height={size}
            alt={imageAlt}
            draggable={false}
          />
        ) : (
          <PlusIcon size={plusSize} />
        )}
      </Box>
      {filled && (
        <DeleteButton
          type="button"
          aria-label={`${name} 빼기`}
          onClick={onRemove}
        >
          <Image
            src={"/icon/deleteIcon/icon/UI_actions/close.svg"}
            width={24}
            height={24}
            alt=""
            draggable={false}
          />
        </DeleteButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Box = styled.button<{
  $size: number;
  $filled: boolean;
  $highlight: SlotHighlight;
}>`
  display: flex;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  padding: 0;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  aspect-ratio: 1/1;
  cursor: pointer;
  border-radius: var(--radius-sm, 6px);
  color: ${({ $highlight }) =>
    $highlight === "none" ? "var(--gray-600, #8e8889)" : NEXT_COLOR};
  border: ${({ $filled, $highlight }) => {
    if ($highlight === "over") return `2px solid ${NEXT_COLOR}`;
    if ($filled) return "none";
    return `1px dashed ${
      $highlight === "target" ? NEXT_COLOR : "var(--gray-400, #d0cccc)"
    }`;
  }};
  background: ${({ $filled, $highlight }) => {
    if ($highlight === "over") return NEXT_BACKGROUND;
    if ($filled) return "transparent";
    return $highlight === "target"
      ? NEXT_BACKGROUND
      : "rgba(255, 255, 255, 0.45)";
  }};

  &:disabled {
    cursor: default;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;
