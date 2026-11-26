"use client";

import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import { LoginField, validateId, validateLoginPassword } from "@u4u/ui";
import {
  getLoginErrorFields,
  getLoginErrorMessage,
  useLogin,
} from "@/src/features/login/model/useLogin";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate: login, isPending, error, reset } = useLogin();

  const loginIdError = isSubmitted ? validateId(loginId) : "";
  const passwordError =
    isSubmitted && !loginIdError ? validateLoginPassword(password) : "";

  let errorMessage = loginIdError || passwordError;

  const hasServerError = !errorMessage && !!error;

  if (hasServerError) {
    errorMessage = getLoginErrorMessage(error);
  }

  const errorFields = hasServerError ? getLoginErrorFields(error) : null;

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
    if (validateLoginPassword(password)) return;

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
        loginIdError={!!loginIdError || !!errorFields?.loginId}
        passwordError={!!passwordError || !!errorFields?.password}
        onLoginIdChange={handleLoginIdChange}
        onPasswordChange={handlePasswordChange}
      />
    </AuthFormLayout>
  );
}
