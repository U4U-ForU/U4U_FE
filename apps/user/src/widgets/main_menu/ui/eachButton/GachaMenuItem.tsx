"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LeftBubble from "../bgBubble/LeftBubble";

export default function GachaMenuItem() {
  const router = useRouter();

  const move = () => {
    router.push("/gacha");
  };

  return (
    <Bubble onClick={move}>
      뽑기
      <Random src="/img/random.svg" alt="" width={37} height={37} />
      <SmallStar src="/img/littlestar.svg" alt="" width={14} height={15} />
    </Bubble>
  );
}

const Bubble = styled(LeftBubble)`
  justify-self: end;
  margin-right: 5px;
  transform: translateY(-6px);
`;

const Random = styled(Image)`
  position: absolute;
  top: -10px;
  right: -10px;
`;

const SmallStar = styled(Image)`
  position: absolute;
  top: 22px;
  right: -5px;
`;
