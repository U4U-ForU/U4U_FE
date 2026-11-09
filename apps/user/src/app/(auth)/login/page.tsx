"use client";

import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import { validateId, validatePassword } from "@/src/shared/lib/validate";
import {
  getLoginErrorMessage,
  useLogin,
} from "@/src/features/login/model/useLogin";
import LoginField from "@/src/features/login/ui/LoginField";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate: login, isPending, error, reset } = useLogin();

  let errorMessage = "";

  if (isSubmitted) {
    errorMessage = validateId(loginId) || validatePassword(password);
  }

  if (!errorMessage && error) {
    errorMessage = getLoginErrorMessage(error);
  }

  const handleLoginIdChange = (value: string) => {
    setLoginId(value);
    if (error) reset();
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (error) reset();
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateId(loginId)) return;
    if (validatePassword(password)) return;

    login({ loginId, password });
  };

  return (
    <AuthFormLayout
      titles={["로그인"]}
      titleAlign="center"
      errorMessage={errorMessage}
      buttonText={isPending ? "로그인 중" : "로그인"}
      buttonDisabled={isPending}
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
