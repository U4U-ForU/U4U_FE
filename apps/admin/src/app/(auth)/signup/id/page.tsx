"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useBackTo } from "@/src/shared/lib/useBackTo";
import AuthFormLayout from "@/src/components/auth/AuthFormLayout";
import {
  Input,
  Requirement,
  Requirements,
  SuccessModal,
  useSignupContext,
  validateId,
} from "@u4u/ui";
import {
  getSignupErrorMessage,
  useSignup,
} from "@/src/features/signup/model/useSignup";

export default function IdPage() {
  const router = useRouter();
  const { data, save } = useSignupContext();
  const [id, setId] = useState(data.id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const goBack = useBackTo("/signup/nickname");
  const { mutate: signup, isPending, isSuccess, error, reset } = useSignup();

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

    save({ id });
    signup(id);
  };

  return (
    <>
      <AuthFormLayout
        titles={["로그인 시 사용될", "아이디를 입력해주세요"]}
        errorMessage={errorMessage}
        buttonText={isPending ? "가입 중" : "가입하기"}
        buttonDisabled={isPending}
        onBack={goBack}
        navDisabled={isPending}
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
      {isSuccess && <SuccessModal onConfirm={() => router.replace("/login")} />}
    </>
  );
}
