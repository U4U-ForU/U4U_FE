"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { outerTextStroke } from "@u4u/ui";

const TITLE = "로딩중";

export default function Loading() {
  return (
    <Wrapper>
      <Character
        src="/img/u4u.svg"
        width={172}
        height={209}
        alt="뽀유"
        priority
      />
      <Box>
        <Group>
          <Texts>
            {[...TITLE].map((char) => (
              <Text key={char} data-text={char}>
                {char}
              </Text>
            ))}
          </Texts>
          <Sub>잠시만 기다려 주세요!</Sub>
        </Group>
        <ProgressBar>
          <Status />
        </ProgressBar>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-height: 100dvh;
  padding: 0 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffe4e4;
`;

const Character = styled(Image)`
  position: relative;
  z-index: 0;
`;

const Box = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: 352px;
  max-width: 100%;
  margin-top: -25px;
  padding: 21px 36px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: var(--radius-md, 12px);
  border: 2px solid var(--pink-p3, #dfafaf);
  background: #fff;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Texts = styled.div`
  display: flex;
`;

const Text = styled.div`
  position: relative;
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  ${outerTextStroke("var(--color-gray-0, #fff)", "var(--brown-p1, #a06d6d)", "4px")}
`;

const Sub = styled.div`
  color: var(--gray-600, #8e8889);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProgressBar = styled.div`
  display: flex;
  height: 8px;
  width: 100%;
  align-items: center;
  align-self: stretch;
  border-radius: 999px;
  border: 1px solid var(--gray-200, #eae8e8);
  background: var(--gray-50, #f9f8f8);
`;

const Status = styled.div`
  width: 73%;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #dfafaf 0%, #ffd0d0 100%);
`;
