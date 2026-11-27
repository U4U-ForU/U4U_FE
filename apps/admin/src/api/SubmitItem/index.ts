import { api } from "@/src/shared/api";
import type {
  ApproveSubmitItemResponse,
  CombineSubmitItemResponse,
  RejectSubmitItemResponse,
  SubmitItem,
  SubmitItemDetailApiResponse,
} from "./type";

export const submitItemApi = async () => {
  const response = await api.get<SubmitItem[]>(
    `/api/admin/items/submissions`,
  );

  return response.data;
};

export const approveSubmitItemApi = async (submissionId: string) => {
  const response = await api.patch<ApproveSubmitItemResponse>(
    `/api/admin/items/submissions/${submissionId}/approve`,
  );

  return response.data;
};

export const combineSubmitItemApi = async (submissionId: string) => {
  const response = await api.patch<CombineSubmitItemResponse>(
    `/api/admin/items/submissions/${submissionId}/combine`,
  );

  return response.data;
};

export const rejectSubmitItemApi = async (submissionId: string) => {
  const response = await api.patch<RejectSubmitItemResponse>(
    `/api/admin/items/submissions/${submissionId}/reject`,
  );

  return response.data;
};

export const submitItemDetailApi = async (submissionId: string) => {
  const response = await api.get<SubmitItemDetailApiResponse>(
    `/api/admin/items/submissions/${submissionId}`,
  );

  return response.data;
};
