"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectSubmitItemApi } from "@/src/api/SubmitItem";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";

export const getRejectSubmitItemErrorMessage = createErrorMessage({
  status: {
    400: "심사 중인 제출만 거절할 수 있습니다.",
    403: "접근 권한이 없습니다.",
    404: "아이템 제출 내역을 찾을 수 없습니다.",
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: true,
  fallback: "거절에 실패했습니다. 잠시 후 다시 시도해주세요.",
});

export default function useRejectSubmitItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectSubmitItemApi,

    onSuccess: (_, submissionId) => {
      queryClient.invalidateQueries({ queryKey: ["submitItems"] });
      queryClient.invalidateQueries({
        queryKey: ["submitItemDetail", submissionId],
      });
    },
  });
}
