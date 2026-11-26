"use client";

import { skipToken, useQuery } from "@tanstack/react-query";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";
import { getMySubmitItemDetail } from "../api/mySubmitItem";

export const getMySubmitItemDetailErrorMessage = createErrorMessage({
  status: {
    403: "해당 제출을 조회할 권한이 없습니다.",
    404: "아이템 제출 내역을 찾을 수 없습니다.",
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: true,
  fallback: "제출 상세를 불러오지 못했습니다.",
});

export const useMySubmitItemDetail = (submissionId: string | null) =>
  useQuery({
    queryKey: ["mySubmitItemDetail", submissionId],
    queryFn:
      submissionId === null
        ? skipToken
        : () => getMySubmitItemDetail(submissionId),
  });
