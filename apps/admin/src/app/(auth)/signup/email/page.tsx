"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useBackTo } from "@/src/shared/lib/useBackTo";
import AuthFormLayout from "@/src/components/auth/AuthFormLayout";
import { Input, useSignupContext, validateEmail } from "@u4u/ui";

export default function EmailPage() {
  const router = useRouter();
  const { data, save } = useSignupContext();
  const [email, setEmail] = useState(data.email);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const goBack = useBackTo("/login");

  const errorMessage = isSubmitted ? validateEmail(email) : "";

  const handleChange = (value: string) => {
    setEmail(value);
    if (data.email) save({ email: "" });
  };

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateEmail(email)) return;

    save({ email });
    router.push("/signup/password");
  };

  return (
    <AuthFormLayout
      titles={["이메일을", "입력해주세요"]}
      errorMessage={errorMessage}
      buttonText="다음"
      onBack={goBack}
      question="회원가입"
      onSubmit={handleNext}
    >
      <Input
        label="이메일"
        placeholder="이메일을 입력해주세요."
        autoComplete="email"
        value={email}
        isError={!!errorMessage}
        onChange={handleChange}
      />
    </AuthFormLayout>
  );
}
