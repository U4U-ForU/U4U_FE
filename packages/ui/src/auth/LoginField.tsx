"use client";

import Input from "./Input";

interface LoginFieldProps {
  loginId: string;
  password: string;
  loginIdError?: boolean;
  passwordError?: boolean;
  onLoginIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

export default function LoginField({
  loginId,
  password,
  loginIdError = false,
  passwordError = false,
  onLoginIdChange,
  onPasswordChange,
}: LoginFieldProps) {
  return (
    <>
      <Input
        label="아이디"
        placeholder="아이디를 입력해주세요."
        autoComplete="username"
        value={loginId}
        isError={loginIdError}
        onChange={onLoginIdChange}
      />
      <Input
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        autoComplete="current-password"
        value={password}
        isError={passwordError}
        onChange={onPasswordChange}
      />
    </>
  );
}
