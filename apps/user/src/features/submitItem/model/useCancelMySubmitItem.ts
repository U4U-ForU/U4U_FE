"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";
import { cancelMySubmitItem } from "../api/mySubmitItem";

export const getCancelMySubmitItemErrorMessage = createErrorMessage({
  status: {
    403: "해당 제출을 취소할 권한이 없습니다.",
    404: "아이템 제출 내역을 찾을 수 없습니다.",
    409: "심사 중인 제출만 취소할 수 있습니다.",
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: true,
  fallback: "제출 취소에 실패했습니다. 잠시 후 다시 시도해주세요.",
});

export const useCancelMySubmitItem = () =>
  useMutation({ mutationFn: cancelMySubmitItem });
