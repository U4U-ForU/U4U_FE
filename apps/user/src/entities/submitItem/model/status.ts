import type { SubmitStatus } from "./types";

export const STATUS_ICONS: Partial<Record<SubmitStatus, string>> = {
  승인거절: "/submitStatus/reject.png",
  "조합아이템 승인": "/submitStatus/comSuccess.png",
  승인완료: "/submitStatus/success.png",
};

export const STATUS_BACKGROUNDS: Partial<Record<SubmitStatus, string>> = {
  승인거절: "#E54D4D",
  "조합아이템 승인": "#50B4DC",
  승인완료: "#20AF61",
};

export const SUBMIT_STATUS_LABELS: Record<string, SubmitStatus | undefined> = {
  PENDING: "승인 전",
  REJECTED: "승인거절",
  COMBINED: "조합아이템 승인",
  APPROVED: "승인완료",
};
