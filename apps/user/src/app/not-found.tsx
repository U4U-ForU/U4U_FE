"use client";

import PageFrame from "@/src/shared/ui/PageFrame";
import styled from "@emotion/styled";
import Button from "@/src/shared/ui/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const cancel = () => {
    router.back();
  };

  const accept = () => {
    router.push("/main");
  };

  return (
    <Page>
      <Wrapper>
        <Error>404</Error>
        <Info>
          <Title>페이지를 찾을 수 없어요</Title>
          <Text>
            찾으시는 페이지가 삭제되었거나, 주소가 변경되었을 수 있어요
          </Text>
        </Info>
        <ButtonWrapper>
          <Button
            text="취소"
            borderColor="#D0CCCC"
            backgroundColor="#F9F8F8"
            boxShadow={false}
            fontColor="#B3AEAF"
            onClick={cancel}
          />
          <Button
            text="수락"
            borderColor="#DFAFAF"
            backgroundColor="#FFD0D0"
            boxShadow={false}
            fontColor="white"
            fontBorderColor="#A75959"
            onClick={accept}
          />
        </ButtonWrapper>
      </Wrapper>
    </Page>
  );
}

const Page = styled(PageFrame)`
  padding-bottom: 0;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 280px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const Error = styled.div`
  color: var(--gray-0, #fff);
  text-align: center;

  /* display/display-large */
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: var(--brown-p1, #a06d6d);
  font-size: var(--typo-display-large, 64px);
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 76.8px */
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  color: var(--brown-p1, #a06d6d);
  margin: 12px 0px 4px 0px;
  /* heading/heading-H2 */
  font-size: var(--typo-heading-h2, 24px);
  font-weight: 700;
  line-height: 120%; /* 28.8px */
`;

const Text = styled.div`
  color: var(--gray-700, #504a4c);
  text-align: center;

  /* body/body-medium */
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  width: 206px;
`;
