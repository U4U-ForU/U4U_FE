import { mock_result } from "./modify/main/result/mock_result";
import type { ResultItemData } from "./modify/main/result/mock_result";

export interface Recipe {
  result: ResultItemData;
  ingredients: string[];
}

export const mock_recipe: Recipe = {
  result: mock_result,
  ingredients: [
    "아메리카노",
    "복숭아 아이스티 샷추가 (아샷추)",
    "플레인 베이글 & 크림치즈",
  ],
};
