"use client";

import styled from "@emotion/styled";
import { useRef, useState, type ChangeEvent } from "react";

const ALLOWED_TYPE = "image/png";
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("파일을 읽지 못했습니다."));
    reader.readAsDataURL(file);
  });
}

function loadImageSize(url: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new window.Image();

    image.onload = () =>
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("이미지를 읽지 못했습니다."));
    image.src = url;
  });
}

interface ImageUploadBoxProps {
  onChange?: (file: File | null) => void;
}

export default function ImageUploadBox({ onChange }: ImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    const reject = (message: string) => {
      setErrorMessage(message);
      setPreviewUrl(null);
      onChange?.(null);
    };

    if (file.type !== ALLOWED_TYPE) {
      reject("PNG 파일만 올릴 수 있어요.");
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      reject("5MB 이하 이미지만 올릴 수 있어요.");
      return;
    }

    let dataUrl: string;
    let width: number;
    let height: number;

    try {
      dataUrl = await readAsDataUrl(file);
      ({ width, height } = await loadImageSize(dataUrl));
    } catch {
      reject("이미지를 읽지 못했어요. 다른 파일을 선택해주세요.");
      return;
    }

    if (width !== height) {
      reject("가로와 세로가 1:1인 이미지만 올릴 수 있어요.");
      return;
    }

    setErrorMessage("");
    setPreviewUrl(dataUrl);
    onChange?.(file);
  };

  return (
    <Wrapper>
      <Box type="button" onClick={() => inputRef.current?.click()}>
        {previewUrl ? (
          <Preview src={previewUrl} alt="선택한 이미지" />
        ) : (
          <>
            <PlusIcon
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M16 6V26M6 16H26"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </PlusIcon>
            <Label>클릭하여 이미지 추가</Label>
          </>
        )}
      </Box>
      {errorMessage ? (
        <ErrorText role="alert">{errorMessage}</ErrorText>
      ) : (
        <Notice>투명배경 + 1:1 비율의 PNG파일만 접수 가능합니다.</Notice>
      )}
      <HiddenInput
        ref={inputRef}
        type="file"
        accept="image/png"
        onChange={handleSelect}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Notice = styled.div`
  color: var(--color-gray-600, #868e96);
  text-align: center;
  margin-bottom: 16px;
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const Box = styled.button`
  display: flex;
  width: 240px;
  height: 240px;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  border: 2px dashed var(--color-gray-500, #adb5bd);
  border-radius: var(--radius-md, 12px);
  background: var(--color-gray-0, #fff);
  color: var(--color-gray-600, #868e96);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const PlusIcon = styled.svg`
  flex-shrink: 0;
  width: 24px;
`;

const Label = styled.span`
  color: var(--color-gray-600, #868e96);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ErrorText = styled.p`
  margin: 0 0 16px;
  color: var(--color-red-600, #f03e3e);
  text-align: center;
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
