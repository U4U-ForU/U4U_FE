import styled from "@emotion/styled";
import Image from "next/image";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import { useTimeout } from "../../model/useTimeout";

const SUCCESS_DURATION_MS = 2_000;

const STARS = [
  { left: 235, top: 83, size: 74, rotate: 12 },
  { left: 14, top: 240, size: 52, rotate: -14 },
  { left: 251, top: 348, size: 44, rotate: -8 },
];

const CIRCLES = [
  { left: 29, top: 134, size: 14 },
  { left: 280, top: 228, size: 7 },
  { left: 287, top: 343, size: 14 },
  { left: 50, top: 388, size: 14 },
  { left: 36, top: 402, size: 7 },
];

interface ItemMixSuccessProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function ItemMixSuccess({
  isOpen,
  onClose,
}: ItemMixSuccessProps) {
  return (
    <ModalParent isOpen={isOpen} onClose={onClose}>
      <SuccessContent onDone={onClose} />
    </ModalParent>
  );
}

function SuccessContent({ onDone }: { onDone?: () => void }) {
  useTimeout(onDone, SUCCESS_DURATION_MS);

  return (
    <Wrapper role="status" aria-live="polite">
      <TitleArea>
        <Text>아이템 생성 완료</Text>
        <SubText>인벤토리를 확인해보세요</SubText>
      </TitleArea>
      <ImageWrapper>
        <Image
          src={"/img/item_mix_success.svg"}
          width={280}
          height={333}
          alt="뽀유"
        />
      </ImageWrapper>
      {STARS.map(({ left, top, size, rotate }) => (
        <Star
          key={`star-${left}-${top}`}
          src={"/img/star.svg"}
          width={size}
          height={size}
          alt=""
          aria-hidden="true"
          style={{ left, top, transform: `rotate(${rotate}deg)` }}
        />
      ))}
      {CIRCLES.map(({ left, top, size }) => (
        <Circle
          key={`circle-${left}-${top}`}
          aria-hidden="true"
          style={{ left, top, width: size, height: size }}
        />
      ))}
    </Wrapper>
  );
}

const TitleArea = styled.div`
  position: relative;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    inset: -60px -30px -56px;
    z-index: -1;
    border-radius: 285px;
    background: rgba(255, 255, 255, 0.8);
    filter: blur(20px);
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 31px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 320px;
  height: 470px;
  border-radius: var(--radius-md, 12px);
  overflow: hidden;
  background: #fff url("/img/background/100.png") center / cover no-repeat;
  padding: 22px 17px;
`;

const Star = styled(Image)`
  position: absolute;
  pointer-events: none;
`;

const Circle = styled.span`
  position: absolute;
  box-sizing: border-box;
  border: 1.5px solid #dfafaf;
  border-radius: 50%;
  background: #ffd3d3;
  pointer-events: none;
`;

const Text = styled.div`
  color: var(--gray-0, #fff);
  text-align: center;
  -webkit-text-stroke: 4px var(--brown-p1, #a06d6d);
  paint-order: stroke fill;
  font-family: "Cafe24 Ssurround";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SubText = styled.div`
  color: var(--brown-p1, #a06d6d);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 4px;
`;
