"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import Modal from "@/src/shared/ui/modal/ModalParent";

interface DailyCheckCompleteModalProps {
  isOpen: boolean;
  reward: number;
  onClose: () => void;
}

export default function DailyCheckCompleteModal({
  isOpen,
  reward,
  onClose,
}: DailyCheckCompleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card role="status">
        <Glow aria-hidden="true" />
        <Title>출석체크 완료!</Title>
        <Reward>+{reward} 별</Reward>
        <Character
          src="/img/dailyCheck/complete.png"
          width={1402}
          height={927}
          alt=""
          aria-hidden="true"
          priority
        />
      </Card>
    </Modal>
  );
}

const Card = styled.div`
  position: relative;
  width: 320px;
  height: 300px;
  border-radius: 12px;
  border: 4px solid #fff;
  background:
    url("/img/dailyCheck/starPattern.svg") repeat,
    linear-gradient(180deg, #ffe4e4 0%, #ffeeee 100%);
  background-size:
    52px 104px,
    auto;
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  width: 285px;
  height: 120px;
  transform: translateX(-50%);
  border-radius: 285px;
  background: rgba(255, 255, 255, 0.8);
  filter: blur(20px);
`;

const Title = styled.p`
  position: relative;
  z-index: 1;
  margin: 24px 0 0;
  color: #fff;
  -webkit-text-stroke: 5px var(--brown-b4, #a06d6d);
  paint-order: stroke fill;
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
`;

const Reward = styled.p`
  position: relative;
  z-index: 1;
  margin: 0px;
  color: var(--brown-b4, #a06d6d);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
`;

const Character = styled(Image)`
  position: absolute;
  top: 137px;
  left: 50%;
  width: 328px;
  max-width: none;
  height: auto;
  transform: translateX(-50%);
`;
