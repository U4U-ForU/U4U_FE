import styled from "@emotion/styled";
import Image from "next/image";
import RightBubble from "../bgBubble/RightBubble";
import { useRouter } from "next/navigation";

export default function InventoryMenuItem() {
  const router = useRouter();

  const move = () => {
    router.push("/inventory");
  };

  return (
    <Bubble onClick={move}>
      인벤
      <SmallStar src="/img/littlestar2.svg" alt="" width={14} height={15} />
    </Bubble>
  );
}

const Bubble = styled(RightBubble)`
  justify-self: start;
  margin-left: 5px;
  transform: translateY(-6px);
  cursor: pointer;
`;

const SmallStar = styled(Image)`
  position: absolute;
  top: 42px;
  left: -3px;
`;
