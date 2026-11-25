"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";
import { useSignupContext } from "@u4u/ui";
import { signup } from "../api/signup";

export const getSignupErrorMessage = createErrorMessage({
  status: {
    400: "입력한 정보를 다시 확인해주세요.",
    409: "이미 사용 중인 아이디 또는 이메일입니다.",
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: true,
  fallback: "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.",
});

export const useSignup = () => {
  const { data } = useSignupContext();

  return useMutation({
    mutationFn: (loginId: string) => signup({ ...data, loginId }),

    onError: (error: unknown) => console.error(getSignupErrorMessage(error)),
  });
};
