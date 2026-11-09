"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import Input from "@/src/features/signup/ui/Input";
import { validateEmail } from "@/src/shared/lib/validate";
import { useSignupContext } from "@/src/features/signup/model/SignupContext";

export default function EmailPage() {
  const router = useRouter();
  const { data, save } = useSignupContext();
  const [email, setEmail] = useState(data.email);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errorMessage = isSubmitted ? validateEmail(email) : "";

  const handleChange = (value: string) => {
    setEmail(value);

    if (data.email !== "") save({ email: "" });
  };

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateEmail(email) !== "") return;

    save({ email });
    router.push("/signup/password");
  };

  return (
    <AuthFormLayout
      titles={["이메일을", "입력해주세요"]}
      errorMessage={errorMessage}
      buttonText="다음"
      question="회원가입"
      onSubmit={handleNext}
    >
      <Input
        label="이메일"
        placeholder="이메일을 입력해주세요."
        autoComplete="email"
        value={email}
        onChange={handleChange}
      />
    </AuthFormLayout>
  );
}
