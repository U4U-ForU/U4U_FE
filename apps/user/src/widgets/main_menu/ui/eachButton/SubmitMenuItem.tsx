import styled from "@emotion/styled";
import Image from "next/image";
import RightBubble from "../bgBubble/RightBubble";
import { useRouter } from "next/navigation";

export default function SubmitMenuItem() {
  const router = useRouter();

  const move = () => {
    router.push("/itemsubmit");
  };

  return (
    <Bubble onClick={move}>
      제출
      <BigStar src="/img/bigstar.svg" alt="" width={25} height={25} />
      <SmallStar src="/img/littlestar2.svg" alt="" width={14} height={15} />
    </Bubble>
  );
}

const Bubble = styled(RightBubble)`
  justify-self: end;
  margin-right: 24.5px;
  cursor: pointer;
`;

const BigStar = styled(Image)`
  position: absolute;
  top: -5px;
  left: -5px;
`;

const SmallStar = styled(Image)`
  position: absolute;
  top: 40px;
  right: -3px;
`;
