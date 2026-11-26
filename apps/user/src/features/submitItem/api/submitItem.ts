import { api } from "@/src/shared/api";
import type {
  SubmitItemRequestProps,
  SubmitItemResponseProps,
} from "./type";

export const submitItem = async ({
  name,
  description,
  image,
}: SubmitItemRequestProps) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image);

  const response = await api.post<SubmitItemResponseProps>(
    `/api/items/submissions`,
    formData,
    { headers: { "Content-Type": null } },
  );

  return response.data;
};
