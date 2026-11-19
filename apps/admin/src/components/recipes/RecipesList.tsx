import RecipeCard from "./RecipeCard";
import styled from "@emotion/styled";
import { mock_items } from "@/src/components/shared/mock_items";

interface RecipesListProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function RecipesList({ setIsOpen }: RecipesListProps) {
  return (
    <Wrapper>
      {mock_items.map((item) => (
        <RecipeCard key={item.id} name={item.name} setIsOpen={setIsOpen} />
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
