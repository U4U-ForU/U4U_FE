import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import { useTimeout } from "../../model/useTimeout";

const FRAMES = ["/mixmodal_ver1.svg", "/mixmodal_ver2.svg"];
const FRAME_INTERVAL_MS = 500;
const MIX_DURATION_MS = 5_000;

interface MixModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onDone?: () => void;
}

export default function MixModal({ isOpen, onClose, onDone }: MixModalProps) {
  return (
    <ModalParent isOpen={isOpen} onClose={onClose}>
      <Wrapper role="status" aria-live="polite">
        <Text>뽀유가 열심히 섞는 중· · ·</Text>
        <MixingCharacter onDone={onDone} />
      </Wrapper>
    </ModalParent>
  );
}

function MixingCharacter({ onDone }: { onDone?: () => void }) {
  const [frame, setFrame] = useState(0);

  useTimeout(onDone, MIX_DURATION_MS);

  useEffect(() => {
    const interval = setInterval(
      () => setFrame((prev) => (prev + 1) % FRAMES.length),
      FRAME_INTERVAL_MS,
    );

    return () => clearInterval(interval);
  }, []);

  return FRAMES.map((src, index) => (
    <Character
      key={src}
      src={src}
      width={251}
      height={240}
      alt=""
      priority
      $visible={index === frame}
    />
  ));
}

const Wrapper = styled.div`
  position: relative;
  width: 320px;
  height: 300px;
  padding-top: 16px;
  border-radius: var(--radius-md, 12px);
  overflow: hidden;

  background:
    linear-gradient(180deg, #fff 35%, rgba(255, 255, 255, 0) 65%),
    #fff url("/img/background/100.png") center / cover no-repeat;
`;

const Text = styled.div`
  position: relative;
  z-index: 1;
  color: var(--brown-p1, #a06d6d);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Character = styled(Image, {
  shouldForwardProp: (prop) => prop !== "$visible",
})<{ $visible: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
`;
