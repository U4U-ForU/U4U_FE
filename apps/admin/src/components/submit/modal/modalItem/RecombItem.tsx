import Image from "next/image";
import styled from "@emotion/styled";

interface RecombItemProps {
  text: string;
}

export default function RecombItem({ text }: RecombItemProps) {
  return (
    <Wrapper>
      <Image
        src={"/tempImg/itemImg/itemImg.svg"}
        width={136}
        height={136}
        alt="재물 아이템"
      />
      <Text>{text}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 0 var(--space-12, 12px);
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
  align-self: stretch;
`;

const Text = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  overflow-wrap: anywhere;
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
  width: 136px;
`;
