"use client";

import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import Button from "@/src/shared/ui/Button";
import Image from "next/image";
import { useSafeBack } from "@/src/shared/lib/useSafeBack";
import PageFrame from "@/src/shared/ui/PageFrame";

export default function Itemrecomb() {
  const goBack = useSafeBack();
  return (
    <Page>
      <Header title="가마솥" onBackPress={goBack} />
      <InfoIconWrapper>
        <InfoIcon
          src={"/icon/info/icon/action/Error.svg"}
          width={24}
          height={24}
          alt="설명"
        />
      </InfoIconWrapper>
      <PotImage
        src={"/tempImg/img/pot.svg"}
        width={353}
        height={447}
        alt="이미지"
      />
      <ButtonWrapper>
        <Button
          text="아이템 섞기"
          fontBorderColor="#A75959"
          borderColor="#DFAFAF"
          backgroundColor="#FFD0D0"
          fontColor="white"
          boxShadow={false}
        />
        <Button
          text="아이템 재조합"
          fontBorderColor="none"
          borderColor="#DFAFAF"
          backgroundColor="white"
          fontColor="#A75959"
          boxShadow={false}
        />
      </ButtonWrapper>
    </Page>
  );
}

const InfoIcon = styled(Image)`
  margin-top: 29px;
`;

const InfoIconWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-right: 30px;
`;

const PotImage = styled(Image)`
  margin-top: 24px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 32px;
`;

const Page = styled(PageFrame)`
  align-items: center;
`;
