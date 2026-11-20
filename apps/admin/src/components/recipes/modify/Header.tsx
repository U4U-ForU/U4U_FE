"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <Wrapper>
      <BackLink href="/recipes" aria-label="조합법 목록으로 돌아가기">
        <Image src={"/icon/Before.svg"} width={6} height={10} alt="" />
      </BackLink>
      <Title>조합법 수정</Title>
    </Wrapper>
  );
}

const BackLink = styled(Link)`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 396px;
  height: 54px;
  padding: var(--space-12, 12px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--radius-full, 999999px);
  background: #fff;
`;

const Title = styled.div`
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
`;
