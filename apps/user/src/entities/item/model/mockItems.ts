import type { InventoryItem } from "./types";

const MOCK_MAKER = "maremare";
const MOCK_DESCRIPTION =
  "푹신한 핑크빛 젤리가 콕 박힌 귀여운 냥이 장갑! 착용하면 냥냥 펀치의 파워가 업! 심쿵 주의 귀여움으로 적의 마음을 스르륵 녹여 공격력을 살짝 낮춰버려요.";

const ITEMS: InventoryItem[] = [
  { id: 1, name: "반짝이는별", count: 10, status: "보유" },
  { id: 2, name: "구름사탕", status: "보유" },
  { id: 3, name: "달빛조각", count: 8, status: "보유" },
  { id: 4, name: "무지개리본", count: 120, status: "보유" },
  { id: 5, name: "솜사탕구름", count: 3, status: "보유" },
  { id: 6, name: "은하수병", count: 1500, status: "보유" },
  { id: 7, name: "노을유리", count: 42, status: "보유" },
  { id: 8, name: "새벽이슬d", status: "예약" },
  { id: 9, name: "별가루주머니", count: 900, status: "예약" },
  { id: 10, name: "밤하늘조각", count: 7, status: "예약" },
  { id: 11, name: "꿈의깃털", count: 25, status: "예약" },
  { id: 12, name: "소원램프", count: 12000, status: "예약" },
  { id: 13, name: "달빛조각", count: 8, status: "보유" },
  { id: 14, name: "무지개리본", count: 120, status: "보유" },
  { id: 15, name: "솜사탕구름", count: 3, status: "보유" },
  { id: 16, name: "은하수병", count: 1500, status: "보유" },
  { id: 17, name: "노을유리", count: 42, status: "보유" },
  { id: 18, name: "새벽이슬", status: "예약" },
  { id: 19, name: "별가루주머니", count: 900, status: "예약" },
  { id: 20, name: "밤하늘조각", count: 7, status: "예약" },
  { id: 21, name: "꿈의깃털", count: 25, status: "예약" },
  { id: 22, name: "소원램프", count: 12000, status: "예약" },
];

export const MOCK_ITEMS: InventoryItem[] = ITEMS.map((item) => ({
  ...item,
  maker: MOCK_MAKER,
  description: MOCK_DESCRIPTION,
}));
