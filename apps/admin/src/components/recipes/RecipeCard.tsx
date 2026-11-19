import styled from "@emotion/styled";
import Image from "next/image";
import type { Recipe } from "./mock_recipes";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  return (
    <Wrapper type="button" onClick={() => onSelect(recipe)}>
      <ItemName>{recipe.result.name}</ItemName>
      <Bottom>
        <Image
          src={"/tempImg/itemImg/itemImg.svg"}
          width={100}
          height={100}
          alt="결과 아이템"
        />

        <Image src={"/icon/location.svg"} width={23} height={10} alt="화살표" />

        <Ingredients>
          {recipe.ingredients.map((ingredient, idx) => (
            <Image
              key={idx}
              src={"/tempImg/itemImg/itemImg.svg"}
              width={50}
              height={50}
              alt={ingredient}
            />
          ))}
        </Ingredients>
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

const Ingredients = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-8, 8px);
`;

const Wrapper = styled.button`
  display: flex;
  width: 353px;
  padding: var(--space-20, 20px) 26px;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-8, 8px);
  border: none;
  border-radius: var(--radius-sm, 6px);
  background: #fff;
  cursor: pointer;

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }

  box-shadow: 0 0 5px 0 var(--color-opacity-black-15, rgba(0, 0, 0, 0.15));
`;
