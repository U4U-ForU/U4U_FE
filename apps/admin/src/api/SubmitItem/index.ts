import { api } from "@/src/shared/api";
import type {
  SubmitItemDetailApiResponse,
  SubmitItemResponse,
} from "./type";

export const submitItemApi = async () => {
  const response = await api.get<SubmitItemResponse>(
    `/api/admin/items/submissions`,
  );

  return response.data.data;
};

export const submitItemDetailApi = async (submissionId: string) => {
  const response = await api.get<SubmitItemDetailApiResponse>(
    `/api/admin/items/submissions/${submissionId}`,
  );

  return response.data;
};
