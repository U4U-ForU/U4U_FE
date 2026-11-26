"use client";

import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";
import { saveTokens } from "@/src/shared/lib/tokenStorage";
import { markReplace } from "@/src/shared/lib/navStack";
import { login } from "../api/login";
import type { LoginRequestProps } from "../api/type";

const INVALID_CREDENTIALS_MESSAGE = "아이디 또는 비밀번호가 올바르지 않습니다.";

const INVALID_CREDENTIALS_STATUSES = [400, 404];

export const getLoginErrorMessage = createErrorMessage({
  status: {
    400: INVALID_CREDENTIALS_MESSAGE,
    404: INVALID_CREDENTIALS_MESSAGE,
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: false,
  unknownMessage: "로그인 정보를 저장하는 중 오류가 발생했습니다.",
  fallback: "로그인 중 오류가 발생했습니다.",
});

export interface LoginErrorFields {
  loginId: boolean;
  password: boolean;
}

const NO_ERROR_FIELDS: LoginErrorFields = { loginId: false, password: false };

const INVALID_CREDENTIALS_FIELDS: LoginErrorFields = {
  loginId: true,
  password: true,
};

export const getLoginErrorFields = (error: unknown): LoginErrorFields => {
  if (!isAxiosError(error)) return NO_ERROR_FIELDS;

  const status = error.response?.status;

  return status !== undefined && INVALID_CREDENTIALS_STATUSES.includes(status)
    ? INVALID_CREDENTIALS_FIELDS
    : NO_ERROR_FIELDS;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginRequestProps) => {
      const tokens = await login(credentials);
      saveTokens(tokens);
      return tokens;
    },

    onSuccess: () => {
      markReplace();
      router.replace("/main");
    },

    onError: (error: unknown) => console.error(getLoginErrorMessage(error)),
  });
};
