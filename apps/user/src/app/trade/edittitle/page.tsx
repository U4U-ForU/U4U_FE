"use client";

import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "@/src/shared/ui/Header";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@u4u/ui";
import { useSafeBack } from "@/src/shared/lib/useSafeBack";
import PageFrame from "@/src/shared/ui/PageFrame";
import TitleInput from "@/src/shared/ui/TitleInput";
import ConfirmModal from "@/src/shared/ui/modal/Modal";

const MAX_ROOM_NAME_LENGTH = 30;

export default function Detail() {
  return (
    <Suspense>
      <EditTitle />
    </Suspense>
  );
}

function EditTitle() {
  const goBack = useSafeBack();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title") ?? "");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const canEdit = title.trim() !== "";

  return (
    <Page>
      <Global styles={dealBackground} />
      <Header title="거래 제목 수정" onBackPress={goBack} />

      <Content>
        <TitleInput
          label="거래방 이름"
          maxLength={MAX_ROOM_NAME_LENGTH}
          value={title}
          onChange={setTitle}
        />
      </Content>

      <ButtonArea>
        <Button
          text="거래 수정하기"
          onClick={() => setIsConfirmOpen(true)}
          disabled={!canEdit}
          fontColor={canEdit ? "white" : "#B3AEAF"}
          backgroundColor={canEdit ? "#FFD0D0" : "#E0DDDD"}
          borderColor={canEdit ? "#DFAFAF" : "white"}
          fontBorderColor={canEdit ? "#A75959" : "none"}
          boxShadow={false}
        />
      </ButtonArea>

      <ConfirmModal
        isOpen={isConfirmOpen}
        type="confirm"
        title={"거래 제목을 정말\n수정하시겠어요?"}
        text="수정한 제목은 거래 목록에도"
        text2="그대로 반영됩니다."
        confirmText="수정"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          router.push("/trade/mytrade");
        }}
      />
    </Page>
  );
}

const ButtonArea = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 103;
  display: flex;
  justify-content: center;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
`;


const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 22px 11px 0;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  width: 100%;
`;

const dealBackground = css`
  .app-background {
    background-image: url("/img/background/100.png");
  }
`;

const Page = styled(PageFrame)`
  align-items: center;
`;
