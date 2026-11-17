import styled from "@emotion/styled";
import Image from "next/image";

interface RecipeEachProps {
  name: string;
  setIsOpen: (isOpen: boolean) => void;
}

export default function RecipesEach({ name, setIsOpen }: RecipeEachProps) {
  return (
    <Wrapper onClick={() => setIsOpen(true)}>
      <ItemName>{name}</ItemName>
      <Bottom>
        <Image
          src={"/tempImg/itemImg/itemImg.svg"}
          width={100}
          height={100}
          alt="결과 아이템"
        />

        <Image src={"/icon/location.svg"} width={23} height={10} alt="화살표" />

        <Items>
          <Image
            src={"/tempImg/itemImg/itemImg.svg"}
            width={50}
            height={50}
            alt="재료 아이템"
          />
          <Image
            src={"/tempImg/itemImg/itemImg.svg"}
            width={50}
            height={50}
            alt="재료 아이템"
          />
          <Image
            src={"/tempImg/itemImg/itemImg.svg"}
            width={50}
            height={50}
            alt="재료 아이템"
          />
        </Items>
      </Bottom>
    </Wrapper>
  );
}

const Bottom = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: stretch;
`;

const ItemName = styled.div`
  color: #000;
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-8, 8px);
`;

const Wrapper = styled.div`
  display: flex;
  width: 353px;
  padding: var(--space-20, 20px) 26px;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-8, 8px);
  border-radius: var(--radius-sm, 6px);
  background: #fff;
  cursor: pointer;

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }

  box-shadow: 0 0 5px 0 var(--color-opacity-black-15, rgba(0, 0, 0, 0.15));
`;
