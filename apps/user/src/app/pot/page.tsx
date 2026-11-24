"use client";

import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import { Button } from "@u4u/ui";
import Image from "next/image";
import { useBackTo } from "@/src/shared/lib/useBackTo";
import PageFrame from "@/src/shared/ui/PageFrame";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PotInfoModal from "@/src/features/pot/ui/PotInfoModal";

export default function Itemrecomb() {
  const router = useRouter();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const moveToMix = () => {
    router.push("/pot/itemmix");
  };

  const moveToRecombList = () => {
    router.push("/pot/recipechoice");
  };

  const goBack = useBackTo("/main");
  return (
    <Page>
      <Header title="가마솥" onBackPress={goBack} />
      <InfoIconWrapper>
        <InfoButton
          type="button"
          aria-label="가마솥 설명 보기"
          onClick={() => setIsInfoOpen(true)}
        >
          <InfoIcon
            src={"/icon/info/icon/action/Error.svg"}
            width={24}
            height={24}
            alt=""
          />
        </InfoButton>
      </InfoIconWrapper>
      <PotArea>
        <PotImage src={"/img/pot.svg"} width={353} height={447} alt="이미지" />
      </PotArea>
      <ButtonWrapper>
        <Button
          text="아이템 섞기"
          fontBorderColor="#A75959"
          borderColor="#DFAFAF"
          backgroundColor="#FFD0D0"
          fontColor="white"
          boxShadow={false}
          onClick={moveToMix}
        />
        <Button
          text="아이템 재조합"
          fontBorderColor="none"
          borderColor="#DFAFAF"
          backgroundColor="white"
          fontColor="#A75959"
          boxShadow={false}
          onClick={moveToRecombList}
        />
      </ButtonWrapper>

      <PotInfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </Page>
  );
}

const InfoButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid var(--pink-p3, #dfafaf);
    outline-offset: 2px;
  }
`;

const InfoIcon = styled(Image)`
  margin-top: 29px;
`;

const InfoIconWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-right: 30px;
`;

const PotArea = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
`;

const PotImage = styled(Image)`
  max-width: 100%;
  height: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Page = styled(PageFrame)`
  align-items: center;
`;
