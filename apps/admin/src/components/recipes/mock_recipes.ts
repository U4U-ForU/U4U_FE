import { mock_items } from "@/src/components/shared/mock_items";
import {
  mock_result,
  type ResultItemData,
} from "./modify/main/result/mock_result";

export interface Recipe {
  id: number;
  result: ResultItemData;
  ingredients: string[];
}

export const mock_recipes: Recipe[] = mock_items.map((item, index) => ({
  id: item.id,
  result: { name: item.name, description: mock_result.description },
  ingredients: [1, 2, 3].map(
    (step) => mock_items[(index + step) % mock_items.length].name,
  ),
}));

export function findRecipe(id: number): Recipe | null {
  return mock_recipes.find((recipe) => recipe.id === id) ?? null;
}
