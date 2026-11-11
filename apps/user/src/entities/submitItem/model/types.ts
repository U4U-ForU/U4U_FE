export type SubmitStatus =
  | "승인 전"
  | "승인거절"
  | "조합아이템 승인"
  | "승인완료";

export type SubmitFilter = "전체" | SubmitStatus;

export const SUBMIT_FILTERS: SubmitFilter[] = [
  "전체",
  "승인 전",
  "승인거절",
  "조합아이템 승인",
  "승인완료",
];

export interface SubmittedItem {
  id: number;
  status: SubmitStatus;
  itemName: string;
  itemDescription: string;
  submittedAt: string;
}
