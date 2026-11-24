"use client";

import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import { Input, Requirement, Requirements, validateId } from "@u4u/ui";
import {
  getSignupErrorMessage,
  useSignup,
} from "@/src/features/signup/model/useSignup";

export default function IdPage() {
  const [id, setId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate: signup, isPending, error, reset } = useSignup();

  let errorMessage = "";

  if (isSubmitted) {
    errorMessage = validateId(id);
  }

  if (!errorMessage && error) {
    errorMessage = getSignupErrorMessage(error);
  }

  const handleChange = (value: string) => {
    setId(value);

    if (error) reset();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateId(id)) return;

    signup(id);
  };

  return (
    <>
      <AuthFormLayout
        titles={["로그인 시 사용될", "아이디를 입력해주세요"]}
        errorMessage={errorMessage}
        buttonText={isPending ? "가입 중" : "가입하기"}
        buttonDisabled={isPending}
        question="회원가입"
        onSubmit={handleSubmit}
      >
        <Input
          label="아이디"
          placeholder="아이디를 입력해주세요"
          autoComplete="username"
          value={id}
          isError={!!errorMessage}
          onChange={handleChange}
        />
        <Requirements>
          <Requirement informationText="영문, 숫자 조합 4~20자 이내" />
          <Requirement informationText="가입 후에는 아이디를 변경할 수 없어요" />
        </Requirements>
      </AuthFormLayout>
    </>
  );
}
