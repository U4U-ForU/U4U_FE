"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";
import { saveTokens } from "@/src/shared/lib/tokenStorage";
import { login } from "../api/login";
import type { LoginRequestProps } from "../api/type";

export const getLoginErrorMessage = createErrorMessage({
  status: {
    400: "로그인에 실패했습니다.",
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: true,
  unknownMessage: "로그인 정보를 저장하는 중 오류가 발생했습니다.",
  fallback: "로그인 중 오류가 발생했습니다.",
});

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginRequestProps) => {
      const tokens = await login(credentials);
      saveTokens(tokens);
      return tokens;
    },

    onSuccess: () => {
      router.replace("/main");
    },

    onError: (error: unknown) => console.error(getLoginErrorMessage(error)),
  });
};
