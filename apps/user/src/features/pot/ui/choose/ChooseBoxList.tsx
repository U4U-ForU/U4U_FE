import ChooseBox from "./ChooseBox";
import styled from "@emotion/styled";
import type { Recipe } from "@/src/features/pot/model/mockRecipes";

interface ChooseBoxListProps {
  recipes: Recipe[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function ChooseBoxList({
  recipes,
  selectedId,
  onSelect,
}: ChooseBoxListProps) {
  return (
    <Wrapper>
      {recipes.map((recipe) => (
        <ChooseBox
          key={recipe.id}
          resultName={recipe.resultName}
          materialNames={recipe.materialNames}
          selected={selectedId === recipe.id}
          onClick={() => onSelect(recipe.id)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
`;
