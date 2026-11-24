"use client";

import styled from "@emotion/styled";
import Input from "./Input";

interface PasswordFieldProps {
  password: string;
  passwordConfirm: string;
  passwordError?: boolean;
  passwordConfirmError?: boolean;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
}

export default function PasswordField({
  password,
  passwordConfirm,
  passwordError = false,
  passwordConfirmError = false,
  onPasswordChange,
  onPasswordConfirmChange,
}: PasswordFieldProps) {
  return (
    <Inputs>
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        autoComplete="new-password"
        value={password}
        isError={passwordError}
        onChange={onPasswordChange}
      />
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        autoComplete="new-password"
        value={passwordConfirm}
        isError={passwordConfirmError}
        onChange={onPasswordConfirmChange}
      />
    </Inputs>
  );
}

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
