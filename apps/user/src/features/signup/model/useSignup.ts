"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/src/features/login/api/login";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";
import { signup } from "../api/signup";
import { useSignupContext } from "./SignupContext";

export const getSignupErrorMessage = createErrorMessage({
  status: {
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: true,
  fallback: "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.",
});

export const useSignup = () => {
  const { data } = useSignupContext();

  return useMutation({
    mutationFn: async (loginId: string) => {
      await signup({ ...data, loginId });
      try {
        return await login({ loginId, password: data.password });
      } catch {
        return null;
      }
    },

    onError: (error: unknown) => console.error(getSignupErrorMessage(error)),
  });
};
