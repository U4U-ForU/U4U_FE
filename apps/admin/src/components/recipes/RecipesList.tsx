import RecipeCard from "./RecipeCard";
import styled from "@emotion/styled";
import { mock_recipes, type Recipe } from "./mock_recipes";

interface RecipesListProps {
  onSelect: (recipe: Recipe) => void;
}

export default function RecipesList({ onSelect }: RecipesListProps) {
  return (
    <Wrapper>
      {mock_recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onSelect={onSelect} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  justify-content: center;
  gap: 48px 32px;
  margin: 48px 0px;
`;
