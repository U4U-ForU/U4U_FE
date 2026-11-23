import styled from "@emotion/styled";
import Image from "next/image";
import LeftBubble from "../bgBubble/LeftBubble";
import { useRouter } from "next/navigation";

export default function PotMenuItem() {
  const router = useRouter();

  const move = () => {
    router.push("/pot");
  };

  return (
    <Bubble onClick={move}>
      가마솥
      <SmallStar src="/img/littlestar2.svg" alt="" width={14} height={15} />
    </Bubble>
  );
}

const Bubble = styled(LeftBubble)`
  justify-self: start;
  margin-left: 24.5px;
  cursor: pointer;
`;

const SmallStar = styled(Image)`
  position: absolute;
  top: 39px;
  right: -3px;
`;
