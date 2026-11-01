"use client";

import Header from "@/src/shared/ui/Header";
import InputBox from "@/src/shared/ui/InputBox";
import ImageUploadBox from "@/src/shared/ui/ImgUploadBox";
import Button from "@/src/shared/ui/Button";
import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ItemSubmit() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const canSubmit =
    imageFile !== null &&
    itemName.trim() !== "" &&
    itemDescription.trim() !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;
  };

  return (
    <Wrapper>
      <Header
        title="아이템 제출"
        onBackPress={() => router.push("/itemSubmitList")}
      />
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
