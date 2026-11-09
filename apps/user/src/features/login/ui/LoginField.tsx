import Input from "@/src/features/signup/ui/Input";

interface LoginFieldProps {
  loginId: string;
  password: string;
  onLoginIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

export default function LoginField({
  loginId,
  password,
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
        onChange={onLoginIdChange}
      />
      <Input
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
      />
    </>
  );
}
