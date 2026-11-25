export interface SubmitItemRequestProps {
  name: string;
  description: string;
  image: File;
}

export interface SubmitItemResponseProps {
  submissionId: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  createdAt: string;
}
