import styled from "@emotion/styled";
import Image from "next/image";
import Badge from "./Badge";

interface ItemProps {
  name: string;
  status: string;
}

export default function Item({ name, status }: ItemProps) {
  return (
    <Wrapper>
      <Badge text={status} />
      <Image
        src={"/tempImg/itemImg/itemImg.svg"}
        width={250}
        height={250}
        alt="아이템 이미지"
      />
      <Name>{name}</Name>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 282px;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  position: relative;
`;

const Name = styled.div`
  overflow: hidden;
  color: var(--gray-1000, #000);
  text-align: center;
  text-overflow: ellipsis;
  font-family: "Cafe24 Ssurround";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
`;
