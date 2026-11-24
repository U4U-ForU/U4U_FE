import { api } from "@/src/shared/api";
import type { LoginRequestProps, LoginResponseProps } from "./type";

export const login = async ({ loginId, password }: LoginRequestProps) => {
  const response = await api.post<LoginResponseProps>(`/api/auth/login`, {
    loginId,
    password,
  });
  return response.data;
};
