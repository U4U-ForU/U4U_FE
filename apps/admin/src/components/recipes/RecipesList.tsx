import RecipesEach from "./RecipesEach";
import { mock_item } from "./mock";
import styled from "@emotion/styled";

interface RecipesListProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function RecipesList({ setIsOpen }: RecipesListProps) {
  return (
    <Wrapper>
      {mock_item.map((item) => (
        <RecipesEach name={item} setIsOpen={setIsOpen} />
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
