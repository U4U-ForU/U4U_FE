import styled from "@emotion/styled";
import Image from "next/image";
import { ChangeEvent } from "react";

interface SearchBarProps {
  input: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ input, onChange }: SearchBarProps) {
  return (
    <Wrapper>
      <IconImage
        src={"/icon/Search/search.svg"}
        width={24}
        height={24}
        alt=""
      />
      <Input
        type="text"
        placeholder="아이템 이름으로 검색하세요"
        aria-label="아이템 이름 검색"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </Wrapper>
  );
}

const IconImage = styled(Image)`
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  outline: none;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Wrapper = styled.div`
  display: flex;
  height: 44px;
  padding: var(--space-8, 8px) var(--space-16, 16px);
  align-items: center;
  gap: 6px;
  border-radius: var(--radius-full, 999999px);
  border: 2px solid var(--gray-500, #b3aeaf);
  background: #fff;
  width: 648px;
  margin: 48px auto 74px;
`;
