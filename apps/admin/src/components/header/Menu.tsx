"use client";

import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";

const MenuList = [
  { name: "아이템 관리", path: "/items" },
  { name: "제출 관리", path: "/submits" },
  { name: "조합법 관리", path: "/recipes" },
];

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Wrapper>
      <ImageWrapper>
        {MenuList.map((item) => (
          <MenuName
            key={item.name}
            $active={pathname === item.path}
            onClick={() => router.push(item.path)}
          >
            {item.name}
          </MenuName>
        ))}
      </ImageWrapper>
    </Wrapper>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  padding: var(--space-12, 12px);
  align-items: flex-start;
  gap: 10px;
  border-radius: var(--radius-full, 999999px);
  background: #fff;
`;

const MenuName = styled.div<{ $active: boolean }>`
  display: flex;
  padding: var(--space-8, 8px) var(--space-24, 24px);
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--radius-full, 999999px);
  background: #fff;
  color: ${({ $active }) => ($active ? "black" : "#8E8889")};
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

const Wrapper = styled.div``;
