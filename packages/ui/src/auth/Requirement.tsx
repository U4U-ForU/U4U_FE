"use client";

import styled from "@emotion/styled";
import Image from "next/image";

interface RequirementProps {
  informationText: string;
}

export default function Requirement({ informationText }: RequirementProps) {
  return (
    <Wrapper>
      <Image src={"/auth/info.png"} width={13} height={13} alt="info" />
      <Info>{informationText}</Info>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  color: var(--color-gray-500, #adb5bd);
  margin-left: 4px;
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-top: 2px;
`;
