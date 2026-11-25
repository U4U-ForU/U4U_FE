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

export interface ApproveSubmitItemResponse {
  submissionId: string;
  status: string;
  approvedAt: string;
  itemId: string;
}

export interface CombineSubmitItemResponse {
  submissionId: string;
  status: string;
  combinedAt: string;
  itemId: string;
}

export interface RejectSubmitItemResponse {
  submissionId: string;
  status: string;
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
