"use client";

import { skipToken, useQuery } from "@tanstack/react-query";
import { submitItemDetailApi } from "@/src/api/SubmitItem";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";

export const getSubmitItemDetailErrorMessage = createErrorMessage({
  status: {
    403: "접근 권한이 없습니다.",
    404: "아이템 제출 내역을 찾을 수 없습니다.",
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: true,
  fallback: "제출 아이템 상세를 불러오지 못했습니다.",
});

export default function useGetSubmitItemDetail(submissionId: string | null) {
  return useQuery({
    queryKey: ["submitItemDetail", submissionId],
    queryFn:
      submissionId === null
        ? skipToken
        : () => submitItemDetailApi(submissionId),
  });
}
