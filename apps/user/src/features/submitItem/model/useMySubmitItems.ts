"use client";

import { useQuery } from "@tanstack/react-query";
import {
  createErrorMessage,
  TOO_MANY_REQUESTS_MESSAGE,
} from "@/src/shared/api/errorResponse";
import { formatDate } from "@/src/shared/lib/formatDate";
import { SUBMIT_STATUS_LABELS } from "@/src/entities/submitItem/model/status";
import type { SubmittedItem } from "@/src/entities/submitItem/model/types";
import { getMySubmitItems } from "../api/mySubmitItem";
import type { MySubmitItemResponseProps } from "../api/type";

export const getMySubmitItemsErrorMessage = createErrorMessage({
  status: {
    429: TOO_MANY_REQUESTS_MESSAGE,
  },
  preferServerMessage: true,
  fallback: "제출 목록을 불러오지 못했습니다.",
});

const toSubmittedItems = (items: MySubmitItemResponseProps[]) =>
  items.reduce<SubmittedItem[]>((result, item) => {
    const status = SUBMIT_STATUS_LABELS[item.status];

    if (status) {
      result.push({
        submissionId: item.submissionId,
        status,
        itemName: item.name,
        imageUrl: item.imageUrl,
        submittedAt: formatDate(item.createdAt),
      });
    }

    return result;
  }, []);

export const useMySubmitItems = () =>
  useQuery({
    queryKey: ["mySubmitItems"],
    queryFn: getMySubmitItems,
    select: toSubmittedItems,
  });
