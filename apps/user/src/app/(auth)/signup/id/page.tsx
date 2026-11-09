"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import Input from "@/src/features/signup/ui/Input";
import Requirement from "@/src/features/signup/ui/Requirement";
import { validateId } from "@/src/shared/lib/validate";
import {
  getSignupErrorMessage,
  useSignup,
} from "@/src/features/signup/model/useSignup";
import { saveTokens } from "@/src/shared/lib/tokenStorage";
import SuccessModal from "@/src/features/signup/ui/SuccessModal";
import Modal from "@/src/shared/ui/modal/ModalParent";

export default function IdPage() {
  const [id, setId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const {
    mutate: signup,
    data: tokens,
    isPending,
    isSuccess,
    error,
    reset,
  } = useSignup();

  let errorMessage = "";

  if (isSubmitted) {
    errorMessage = validateId(id);
  }

  if (!errorMessage && error) {
    errorMessage = getSignupErrorMessage(error);
  }

  const handleChange = (value: string) => {
    setId(value);

    if (error) reset();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateId(id)) return;

    signup(id);
  };

  const handleConfirm = () => {
    if (!tokens) {
      router.replace("/login");
      return;
    }

    saveTokens(tokens);
    router.replace("/main");
  };

  return (
    <>
      <Modal isOpen={isSuccess}>
        <SuccessModal onConfirm={handleConfirm} />
      </Modal>

      <AuthFormLayout
        titles={["로그인 시 사용될", "아이디를 입력해주세요"]}
        errorMessage={errorMessage}
        buttonText={isPending ? "가입 중" : "가입하기"}
        buttonDisabled={isPending}
        question="회원가입"
        onSubmit={handleSubmit}
      >
        <Input
          label="아이디"
          placeholder="아이디를 입력해주세요"
          autoComplete="username"
          value={id}
          onChange={handleChange}
        />
        <Requirements>
          <Requirement informationText="영문, 숫자 조합 4~20자 이내" />
          <Requirement informationText="가입 후에는 아이디를 변경할 수 없어요" />
        </Requirements>
      </AuthFormLayout>
    </>
  );
}

const Requirements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
