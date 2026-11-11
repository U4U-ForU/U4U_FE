export type Status =
  | "심사 중"
  | "승인 완료"
  | "조합 처리 완료"
  | "거절됨"
  | "취소됨";

export interface ItemMockType {
  id: number;
  title: string;
  status: Status;
}
