"use client";

import { useQuery } from "@tanstack/react-query";
import { submitItemApi } from "@/src/api/SubmitItem";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";

export const getSubmitItemsErrorMessage = createErrorMessage({
  status: {
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: true,
  fallback: "제출 아이템을 불러오지 못했습니다.",
});

export default function useGetSubmitItems() {
  return useQuery({
    queryKey: ["submitItems"],
    queryFn: submitItemApi,
  });
}
