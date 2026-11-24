import styled from "@emotion/styled";
import Image from "next/image";

interface ItemProps {
  name: string;
}

export default function Item({ name }: ItemProps) {
  return (
    <Wrapper>
      <Image
        src={"/tempImg/tempItemImg.png"}
        width={68}
        height={68}
        alt={name}
      ></Image>
      <Text>{name}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding: 0 14px;
`;

const Text = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: keep-all;
  overflow-wrap: anywhere;
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
  margin-top: 7px;
  width: 72px;
`;
