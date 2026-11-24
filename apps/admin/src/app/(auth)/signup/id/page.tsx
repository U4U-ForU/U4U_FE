"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/components/auth/AuthFormLayout";
import {
  Input,
  Requirement,
  Requirements,
  useSignupContext,
  validateId,
} from "@u4u/ui";

export default function IdPage() {
  const router = useRouter();

  const { data, save } = useSignupContext();
  const [id, setId] = useState(data.id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const errorMessage = isSubmitted ? validateId(id) : "";

  const handleChange = (value: string) => {
    setId(value);

    if (data.id) save({ id: "" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateId(id)) return;

    // TODO: 회원가입 API 연동
    save({ id });
    setIsSuccess(true);
    router.push("/login");
  };

  return (
    <>
      <AuthFormLayout
        titles={["로그인 시 사용될", "아이디를 입력해주세요"]}
        errorMessage={errorMessage}
        buttonText="가입하기"
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
