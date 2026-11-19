"use client";

import ResultItem from "@/src/components/recipes/modify/main/result/ResultItem";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Inventory from "@/src/components/recipes/modify/inventory/Inventory";
import InfoLine from "@/src/components/recipes/modify/main/InfoLine";
import Inputs from "@/src/components/recipes/modify/main/input/Inputs";
import Buttons from "@/src/components/recipes/modify/main/Buttons";
import { mock_recipe } from "@/src/components/recipes/mock_recipe";
import { useRecipeSlots } from "@/src/components/recipes/modify/shared/useRecipeSlots";

export default function Page() {
  const {
    result,
    slots,
    resultHighlight,
    slotHighlights,
    canSubmit,
    pickTarget,
    setOver,
    addItem,
    setResultName,
    removeResult,
    setItemAt,
    removeItem,
  } = useRecipeSlots(mock_recipe.result, mock_recipe.ingredients);

  return (
    <>
      <Global styles={fixedViewport} />
      <Wrapper>
        <Main>
          <ResultItem
            result={result}
            highlight={resultHighlight}
            onPick={() => pickTarget("result")}
            onRemove={removeResult}
            onDropItem={setResultName}
            onOverChange={(isOver) => setOver("result", isOver)}
          />
          <InfoLine />
          <Inputs
            slots={slots}
            highlights={slotHighlights}
            onPick={pickTarget}
            onRemove={removeItem}
            onDropItem={setItemAt}
            onOverChange={setOver}
          />
          <Bottom>
            <Buttons canSubmit={canSubmit} />
            <Info>오른쪽에서 재료를 선택하거나 드래그하여 배치</Info>
          </Bottom>
        </Main>
        <Inventory onSelect={addItem} />
      </Wrapper>
    </>
  );
}

const Bottom = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const Info = styled.div`
  color: var(--gray-600, #8e8889);
  text-align: center;

  /* body/body-small */
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

const fixedViewport = css`
  body {
    height: 100dvh;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const Main = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  overflow-y: auto;
  gap: 48px;
  padding: clamp(12px, 2vh, 24px) 0 clamp(28px, 6vh, 72px);
  align-items: center;
  justify-content: center;
  justify-content: safe center;
`;
