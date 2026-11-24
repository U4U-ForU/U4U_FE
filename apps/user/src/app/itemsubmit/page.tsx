"use client";

import Header from "@/src/shared/ui/Header";
import InputBox from "@/src/shared/ui/InputBox";
import ImageUploadBox from "@/src/shared/ui/ImgUploadBox";
import { Button } from "@u4u/ui";
import styled from "@emotion/styled";
import { useState } from "react";
import { useBackTo } from "@/src/shared/lib/useBackTo";
import { useRouter } from "next/navigation";
import ResultModal from "@/src/shared/ui/modal/ResultModal";
import ConfirmModal from "@/src/shared/ui/modal/Modal";

export default function ItemSubmit() {
  const router = useRouter();

  const goBack = useBackTo("/itemsubmitlist");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmittedOpen, setIsSubmittedOpen] = useState(false);

  const canSubmit =
    imageFile !== null &&
    itemName.trim() !== "" &&
    itemDescription.trim() !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;

    setIsConfirmOpen(true);
  };

  return (
    <Wrapper>
      <Header title="아이템 제출" onBackPress={goBack} />
      <UploadArea>
        <ImageUploadBox onChange={setImageFile} />
      </UploadArea>
      <InputWrapper>
        <InputBox
          label="아이템 이름"
          placeholder="아이템 이름을 입력해주세요"
          height={48}
          maxLength={15}
          value={itemName}
          onChange={setItemName}
        />
        <InputBox
          label="아이템 설명"
          placeholder="아이템 설명을 입력해주세요"
          height={160}
          maxLength={200}
          value={itemDescription}
          onChange={setItemDescription}
        />
      </InputWrapper>
      <SubmitButton
        text="아이템 제출"
        fontColor="white"
        fontBorderColor="#A75959"
        backgroundColor="#FFD0D0"
        borderColor="#DFAFAF"
        boxShadow={false}
        onClick={handleSubmit}
        disabled={!canSubmit}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        type="confirm"
        title={"아이템을 정말\n제출하시겠어요?"}
        text="제출 후에는 내용 수정이 불가하며"
        text2="승인 전까지 취소할 수 있습니다."
        confirmText="제출"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          setIsSubmittedOpen(true);
        }}
      />

      <ResultModal
        isOpen={isSubmittedOpen}
        size="sm"
        title="제출되었습니다"
        text="제출 목록에서 확인하세요!"
        onDone={() => router.push("/itemsubmitlist")}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100dvh;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  align-items: center;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  margin-top: auto;
`;

const UploadArea = styled.div`
  margin-top: 24px;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 353px;
  flex-direction: column;
  gap: var(--space-16, 16px);
  margin-bottom: 39px;
`;
