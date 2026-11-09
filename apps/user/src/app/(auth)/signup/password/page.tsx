"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import Input from "@/src/features/signup/ui/Input";
import Requirement from "@/src/features/signup/ui/Requirement";
import {
  validatePassword,
  validatePasswordConfirm,
} from "@/src/shared/lib/validate";
import { useSignupContext } from "@/src/features/signup/model/SignupContext";

export default function PasswordPage() {
  const router = useRouter();
  const { data, save } = useSignupContext();
  const [password, setPassword] = useState(data.password);
  const [passwordConfirm, setPasswordConfirm] = useState(data.password);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errorMessage = (() => {
    const isMismatched = passwordConfirm !== "" && password !== passwordConfirm;

    if (isMismatched) return validatePasswordConfirm(password, passwordConfirm);

    if (!isSubmitted) return "";

    return (
      validatePassword(password) ||
      validatePasswordConfirm(password, passwordConfirm)
    );
  })();

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (data.password !== "") save({ password: "" });
  };

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validatePassword(password) !== "") return;
    if (validatePasswordConfirm(password, passwordConfirm) !== "") return;

    save({ password });
    router.push("/signup/nickname");
  };

  return (
    <AuthFormLayout
      titles={["비밀번호를", "입력해주세요"]}
      errorMessage={errorMessage}
      buttonText="다음"
      question="회원가입"
      onSubmit={handleNext}
    >
      <Inputs>
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="new-password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
      </Inputs>
      <Requirement informationText="영문, 숫자, 특수문자를 포함하여 8~20자 이내" />
    </AuthFormLayout>
  );
}

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
