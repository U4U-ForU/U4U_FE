"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

interface QuestionProps {
  text: "회원가입" | "로그인";
  onBeforeNavigate?: () => void;
}

export default function Question({ text, onBeforeNavigate }: QuestionProps) {
  const router = useRouter();

  const isSignup = text === "회원가입";

  const move = () => {
    onBeforeNavigate?.();
    router.replace(isSignup ? "/login" : "/signup");
  };

  return (
    <Wrapper>
      <Q>{isSignup ? "계정이 있으신가요?" : "계정이 없으신가요?"}</Q>
      <Button type="button" onClick={move}>
        {isSignup ? "로그인" : "회원가입"}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const Q = styled.div`
  color: var(--color-gray-600, #868e96);
  text-align: center;
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-weight: 400;
  line-height: 150%;
`;

const Button = styled.button`
  color: var(--color-gray-600, #868e96);
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-weight: 600;
  line-height: 150%;

  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;
