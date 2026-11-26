"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";
import { submitItem } from "../api/submitItem";

export const getSubmitItemErrorMessage = createErrorMessage({
  status: {
    400: "입력한 내용을 다시 확인해주세요.",
    404: "유저를 찾을 수 없습니다.",
    409: "이미 사용 중인 아이템 이름입니다.",
    413: "이미지 파일 용량이 너무 큽니다.",
    429: TOO_MANY_REQUESTS_MESSAGE,
    500: "이미지 파일 저장에 실패했습니다.",
  },
  preferServerMessage: true,
  fallback: "아이템 제출에 실패했습니다. 잠시 후 다시 시도해주세요.",
});

export const useSubmitItem = () => useMutation({ mutationFn: submitItem });
