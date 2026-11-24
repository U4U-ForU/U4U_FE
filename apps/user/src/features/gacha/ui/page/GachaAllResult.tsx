"use client";

import styled from "@emotion/styled";
import { Button, outerTextStroke } from "@u4u/ui";
import GachaItemList from "../item/GachaItemList";
import type { GachaItem } from "../../model/types";

interface GachaAllResultProps {
  items: GachaItem[];
  onComplete: () => void;
}

export default function GachaAllResult({
  items,
  onComplete,
}: GachaAllResultProps) {
  return (
    <Wrapper>
      <Title data-text="뽑기 결과">뽑기 결과</Title>
      <GachaItemList items={items} />
      <Bottom>
        <Button
          text="뽑기 완료"
          borderColor="#DFAFAF"
          backgroundColor="#FFD0D0"
          fontColor="white"
          fontBorderColor="#A75959"
          boxShadow={false}
          onClick={onComplete}
        />
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
`;

const Title = styled.h1`
  margin: calc(env(safe-area-inset-top) + 48px) 0 20px;
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */

  ${outerTextStroke("#fff", "var(--pink-p3, #dfafaf)", "4px")}
`;

const Bottom = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: center;
  padding: 24px 0 32px;
`;
