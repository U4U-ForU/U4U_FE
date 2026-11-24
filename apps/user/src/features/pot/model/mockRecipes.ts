export interface Recipe {
  id: number;
  resultName: string;
  materialNames: string[];
}

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 1,
    resultName: "별빛 반지",
    materialNames: ["반짝이는별", "은하수병", "달빛조각"],
  },
  {
    id: 2,
    resultName: "구름 케이크",
    materialNames: ["구름사탕", "솜사탕구름", "무지개리본"],
  },
  {
    id: 3,
    resultName: "노을 등불",
    materialNames: ["노을유리", "소원램프", "밤하늘조각"],
  },
  {
    id: 4,
    resultName: "꿈결 목걸이",
    materialNames: ["꿈의깃털", "별가루주머니", "새벽이슬"],
  },
  {
    id: 5,
    resultName: "달빛 부채",
    materialNames: ["달빛조각", "무지개리본", "구름사탕"],
  },
  {
    id: 6,
    resultName: "은하 오르골",
    materialNames: ["은하수병", "별가루주머니", "소원램프"],
  },
  {
    id: 7,
    resultName: "새벽 손거울",
    materialNames: ["새벽이슬", "달빛조각", "노을유리"],
  },
];
