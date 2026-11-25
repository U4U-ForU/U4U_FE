import { api } from "@/src/shared/api";
import type { SignupRequestProps, SignupResponseProps } from "./type";

export const signup = async ({
  loginId,
  password,
  email,
  nickname,
}: SignupRequestProps) => {
  const response = await api.post<SignupResponseProps>(`/api/auth/signup`, {
    loginId,
    password,
    email,
    nickname,
  });
  return response.data;
};
