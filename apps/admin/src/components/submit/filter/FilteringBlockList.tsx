import FilteringBlock from "./FilteringBlock";
import styled from "@emotion/styled";
import { useState } from "react";

export default function FilteringBlockList() {
  const [active, setActive] = useState("전체");

  const LIST = [
    {
      name: "전체",
      count: 193,
    },
    {
      name: "심사 중",
      count: 64,
    },
    {
      name: "승인 완료",
      count: 22,
    },
    {
      name: "조합 처리 완료",
      count: 6,
    },
    {
      name: "거절됨",
      count: 43,
    },
    {
      name: "취소됨",
      count: 24,
    },
  ];

  return (
    <Wrapper>
      {LIST.map((item) => (
        <FilteringBlock
          key={item.name}
          title={item.name}
          count={item.count}
          active={active === item.name}
          onClick={() => setActive(item.name)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-12, 12px);
  width: 1000px;
  height: 44px;
  margin: 48px 0px;
`;
