"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/components/auth/AuthFormLayout";
import { LoginField, validateId, validatePassword } from "@u4u/ui";

export default function Login() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const loginIdError = isSubmitted ? validateId(loginId) : "";
  const passwordError =
    isSubmitted && !loginIdError ? validatePassword(password) : "";
  const errorMessage = loginIdError || passwordError;

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateId(loginId)) return;
    if (validatePassword(password)) return;

    router.replace("/items");
  };

  return (
    <AuthFormLayout
      titles={["로그인"]}
      titleAlign="center"
      errorMessage={errorMessage}
      buttonText="로그인"
      question="로그인"
      onSubmit={handleLogin}
    >
      <LoginField
        loginId={loginId}
        password={password}
        loginIdError={!!loginIdError}
        passwordError={!!passwordError}
        onLoginIdChange={setLoginId}
        onPasswordChange={setPassword}
      />
    </AuthFormLayout>
  );
}
