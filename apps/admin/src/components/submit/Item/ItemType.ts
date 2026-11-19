export type Status =
  "심사 중" | "승인 완료" | "조합 처리 완료" | "거절됨" | "취소됨";

export type StatusFilter = "전체" | Status;

export const STATUS_LABEL: Record<Status, string> = {
  "심사 중": "승인 전",
  "승인 완료": "승인 완료",
  "조합 처리 완료": "조합 처리 완료",
  거절됨: "거절됨",
  취소됨: "취소됨",
};

export interface ItemMockType {
  id: number;
  name: string;
  status: Status;
}
