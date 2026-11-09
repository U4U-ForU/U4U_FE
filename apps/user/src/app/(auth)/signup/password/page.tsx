"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import PasswordField from "@/src/features/signup/ui/PasswordField";
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
    const isMismatched = !!passwordConfirm && password !== passwordConfirm;

    if (isMismatched) return validatePasswordConfirm(password, passwordConfirm);

    if (!isSubmitted) return "";

    return (
      validatePassword(password) ||
      validatePasswordConfirm(password, passwordConfirm)
    );
  })();

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (data.password) save({ password: "" });
  };

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validatePassword(password)) return;
    if (validatePasswordConfirm(password, passwordConfirm)) return;

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
      <PasswordField
        password={password}
        passwordConfirm={passwordConfirm}
        onPasswordChange={handlePasswordChange}
        onPasswordConfirmChange={setPasswordConfirm}
      />
      <Requirement informationText="영문, 숫자, 특수문자를 포함하여 8~20자 이내" />
    </AuthFormLayout>
  );
}
