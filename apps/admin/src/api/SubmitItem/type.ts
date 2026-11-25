export interface SubmitItem {
  submissionId: string;
  name: string;
  imageUrl: string;
  submitterLoginId: string;
  status: string;
  createdAt: string;
}

export interface SubmitItemResponse {
  data: SubmitItem[];
}

export interface SubmitItemDetailApiResponse {
  submissionId: string;
  name: string;
  description: string;
  imageUrl: string;
  submitterLoginId: string;
  status: string;
  createdAt: string;
  approvedAt: string | null;
  combinedAt: string | null;
}
