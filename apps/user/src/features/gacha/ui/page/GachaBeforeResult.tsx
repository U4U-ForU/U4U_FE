"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import SkipButton from "../SkipButton";
import { SkipArea } from "@/src/features/gacha/ui/SkipArea";
import { Button } from "@u4u/ui";

interface GachaBeforeResultProps {
  onFinish: () => void;
}

export default function GachaBeforeResult({
  onFinish,
}: GachaBeforeResultProps) {
  return (
    <Wrapper>
      <SkipArea>
        <SkipButton onClick={onFinish} />
      </SkipArea>
      <Content>
        <Machine>
          <GachaImage
            src="/img/Gacha/Gacha.svg"
            width={320}
            height={442}
            alt=""
            priority
          />
          <Ball
            src="/img/Gacha/ball.svg"
            width={102}
            height={102}
            alt=""
            priority
            onClick={onFinish}
          />
          <Bubble
            text="클릭하세요!"
            fontColor="#fff"
            fontBorderColor="#DFAFAF"
            backgroundColor="#fff"
            boxShadow={false}
            onClick={onFinish}
          />
        </Machine>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  margin-bottom: 60px;
`;

const Machine = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
`;

const GachaImage = styled(Image)`
  width: 100%;
  height: auto;
`;

const Ball = styled(Image)`
  position: absolute;
  left: 52%;
  bottom: -50px;
  transform: translateX(-50%);
  width: 102px;
  max-width: none;
  height: auto;
  cursor: pointer;
`;

const Bubble = styled(Button)`
  && {
    position: absolute;
    top: calc(100% + 55px);
    left: 50%;
    transform: translateX(-50%);
    width: 259px;
    max-width: calc(100vw - 40px);
    height: 68px;
    padding: 16px 24px;
    border-radius: 20px;
  }

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: calc(100% - 12.75px);
    width: 25.5px;
    height: 25.5px;
    background: #fff;
    border-top-left-radius: 7px;
    transform: translateX(-50%) scaleY(1.333) rotate(45deg);
    z-index: -1;
  }
`;
