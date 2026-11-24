export interface DealRoomDetail {
  title: string;
  date: string;
  writer: string;
  text: string;
  itemCount: number;
}

export const MOCK_ROOM_DETAIL: DealRoomDetail = {
  title: "(방이름들감) 거래하실부운~ㅎ",
  date: "2026.09.18",
  writer: "maremare",
  text: `여기 8개 아이템 거래하실 분 있으신가여
              몆개는 조합해서 얻은거라서 좀 희귀한 거랑 거래하고 싶어요...
              사실 별생각없구요 거래댓 많이 달아주세염`,
  itemCount: 10,
};
