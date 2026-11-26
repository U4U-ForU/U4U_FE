import { api } from "@/src/shared/api";
import type {
  MySubmitItemDetailResponseProps,
  MySubmitItemResponseProps,
} from "./type";

export const getMySubmitItems = async () => {
  const response = await api.get<MySubmitItemResponseProps[]>(
    `/api/items/submissions/me`,
  );

  return response.data;
};

export const getMySubmitItemDetail = async (submissionId: string) => {
  const response = await api.get<MySubmitItemDetailResponseProps>(
    `/api/items/submissions/${submissionId}`,
  );

  return response.data;
};

export const cancelMySubmitItem = async (submissionId: string) => {
  const response = await api.patch<MySubmitItemDetailResponseProps>(
    `/api/items/submissions/${submissionId}/cancel`,
  );

  return response.data;
};
