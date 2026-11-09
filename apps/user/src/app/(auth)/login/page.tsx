"use client";

import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import { validateId, validatePassword } from "@/src/shared/lib/validate";
import { useLoginSubmit } from "@/src/features/login/model/useLoginSubmit";
import LoginField from "@/src/features/login/ui/LoginField";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { submit, isSubmitting, error, resetError } = useLoginSubmit();

  let errorMessage = "";

  if (isSubmitted) {
    errorMessage = validateId(loginId) || validatePassword(password);
  }

  if (!errorMessage) {
    errorMessage = error;
  }

  const handleLoginIdChange = (value: string) => {
    setLoginId(value);
    if (error) resetError();
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (error) resetError();
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateId(loginId)) return;
    if (validatePassword(password)) return;

    submit({ loginId, password });
  };

  return (
    <AuthFormLayout
      titles={["로그인"]}
      titleAlign="center"
      errorMessage={errorMessage}
      buttonText={isSubmitting ? "로그인 중" : "로그인"}
      buttonDisabled={isSubmitting}
      question="로그인"
      onSubmit={handleLogin}
    >
      <LoginField
        loginId={loginId}
        password={password}
        onLoginIdChange={handleLoginIdChange}
        onPasswordChange={handlePasswordChange}
      />
    </AuthFormLayout>
  );
}
