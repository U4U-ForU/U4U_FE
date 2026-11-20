import styled from "@emotion/styled";
import Image from "next/image";

export default function InfoLine() {
  return (
    <Wrapper>
      <Line />
      <Center>
        <Image src={"/icon/info.svg"} width={10} height={6} alt="아이콘" />
        <Text>아래 재료들을 조합하여 위 아이템을 생성합니다.</Text>
      </Center>
      <Line />
    </Wrapper>
  );
}

const Line = styled.div`
  background: var(--gray-300, #e0dddd);
  flex: 1 1 0;
  min-width: 0;
  max-width: 300px;
  height: 2px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const Text = styled.div`
  color: var(--gray-600, #8e8889);
  text-align: center;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Center = styled.div`
  display: flex;
  padding: var(--space-8, 8px) var(--space-20, 20px);
  gap: 8px;
  align-items: center;
  border-radius: var(--radius-full, 999999px);
  border: 2px solid var(--gray-300, #e0dddd);
  background: #fff;
  width: 377px;
  flex-shrink: 0;
`;
