export type DealStatus = "내 글" | "내 댓글";

export type DealFilter = "전체" | DealStatus;

export interface DealRoom {
  id: number;
  name: string;
  itemCount: number;
  commentCount: number;
  nickname: string;
  status: DealStatus;
}
