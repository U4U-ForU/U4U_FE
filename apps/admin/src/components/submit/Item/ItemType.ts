export type Status =
  | "심사 중"
  | "승인 완료"
  | "조합 처리 완료"
  | "거절됨"
  | "취소됨";

export type StatusFilter = "전체" | Status;

export const STATUS_LABEL: Record<Status, string> = {
  "심사 중": "승인 전",
  "승인 완료": "승인 완료",
  "조합 처리 완료": "조합 처리 완료",
  거절됨: "거절됨",
  취소됨: "취소됨",
};

export const STATUS_COLOR: Record<Status, string> = {
  "심사 중": "#b3aeaf",
  "승인 완료": "#50ab80",
  "조합 처리 완료": "#69add4",
  거절됨: "#e26c7a",
  취소됨: "#8e8889",
};

export const UNKNOWN_STATUS_COLOR = "#b3aeaf";

const STATUS_BY_SERVER_VALUE: Record<string, Status> = {
  PENDING: "심사 중",
  APPROVED: "승인 완료",
  COMBINED: "조합 처리 완료",
  REJECTED: "거절됨",
  CANCELED: "취소됨",
};

export const toStatus = (value: string): Status | null =>
  STATUS_BY_SERVER_VALUE[value] ?? null;
