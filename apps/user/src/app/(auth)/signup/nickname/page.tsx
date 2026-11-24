"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import {
  Input,
  Requirement,
  Requirements,
  useSignupContext,
  validateNickname,
} from "@u4u/ui";

export default function NicknamePage() {
  const router = useRouter();
  const { data, save } = useSignupContext();
  const [nickname, setNickname] = useState(data.nickname);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errorMessage = isSubmitted ? validateNickname(nickname) : "";

  const handleChange = (value: string) => {
    setNickname(value);

    if (data.nickname) save({ nickname: "" });
  };

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateNickname(nickname)) return;

    save({ nickname });
    router.push("/signup/id");
  };

  return (
    <AuthFormLayout
      titles={["서비스에서 사용할", "닉네임을 입력해주세요"]}
      errorMessage={errorMessage}
      buttonText="다음"
      question="회원가입"
      onSubmit={handleNext}
    >
      <Input
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        autoComplete="nickname"
        value={nickname}
        isError={!!errorMessage}
        onChange={handleChange}
      />
      <Requirements>
        <Requirement informationText="2자 이상 20자 이하" />
        <Requirement informationText="닉네임은 가입 후에도 변경할 수 있어요" />
      </Requirements>
    </AuthFormLayout>
  );
}
