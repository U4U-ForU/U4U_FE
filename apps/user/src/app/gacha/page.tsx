"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { useGachaFlow } from "@/src/features/gacha/model/useGachaFlow";
import GachaModal from "@/src/features/gacha/ui/modal/Modal";
import GachaReady from "@/src/features/gacha/ui/page/GachaReady";
import GachaGo from "@/src/features/gacha/ui/page/GachaGo";
import GachaBeforeResult from "@/src/features/gacha/ui/page/GachaBeforeResult";
import GachaResult from "@/src/features/gacha/ui/page/GachaResult";
import GachaAllResult from "@/src/features/gacha/ui/page/GachaAllResult";
import Modal from "@/src/shared/ui/modal/ModalParent";
import { useUserStarStore } from "@/src/entities/user/model/useUserStarStore";
import {
  GACHA_DRAW_COST,
  type GachaDrawCount,
} from "@/src/features/gacha/model/types";

export default function Gacha() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawCount, setDrawCount] = useState<GachaDrawCount>(10);
  const { step, items, draw, finishDrawing, showResult, showAllResult, reset } =
    useGachaFlow();
  const spendStars = useUserStarStore((state) => state.spendStars);

  const confirmDraw = () => {
    if (!spendStars(GACHA_DRAW_COST[drawCount])) return;

    setIsModalOpen(false);
    draw(drawCount);
  };

  return (
    <Page>
      {step === "ready" && (
        <GachaReady
          onDraw={(selectedDrawCount) => {
            setDrawCount(selectedDrawCount);
            setIsModalOpen(true);
          }}
        />
      )}
      {step === "drawing" && <GachaGo onFinish={finishDrawing} />}
      {step === "beforeResult" && <GachaBeforeResult onFinish={showResult} />}
      {step === "result" && (
        <GachaResult items={items} onSkip={showAllResult} />
      )}
      {step === "allResult" && (
        <GachaAllResult items={items} onComplete={reset} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <GachaModal
          drawCount={drawCount}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={confirmDraw}
        />
      </Modal>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  height: 100dvh;
  padding-bottom: env(safe-area-inset-bottom);
  flex-direction: column;
`;
