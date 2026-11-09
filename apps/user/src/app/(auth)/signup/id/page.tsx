"use client";

import styled from "@emotion/styled";
import { useState, type FormEvent } from "react";
import AuthFormLayout from "@/src/features/signup/ui/AuthFormLayout";
import Input from "@/src/features/signup/ui/Input";
import Requirement from "@/src/features/signup/ui/Requirement";
import { validateId } from "@/src/shared/lib/validate";
import { useSignupSubmit } from "@/src/features/signup/model/useSignupSubmit";
import SuccessModal from "@/src/features/signup/ui/SuccessModal";
import Modal from "@/src/shared/ui/modal/ModalParent";

export default function IdPage() {
  const [id, setId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { submit, isSubmitting, error, resetError, isSuccess, confirmSuccess } =
    useSignupSubmit();

  const errorMessage = (isSubmitted ? validateId(id) : "") || error;

  const handleChange = (value: string) => {
    setId(value);

    if (error !== "") resetError();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateId(id) !== "") return;

    submit(id);
  };

  return (
    <>
      <Modal isOpen={isSuccess}>
        <SuccessModal onConfirm={confirmSuccess} />
      </Modal>

      <AuthFormLayout
        titles={["로그인 시 사용될", "아이디를 입력해주세요"]}
        errorMessage={errorMessage}
        buttonText={isSubmitting ? "가입 중" : "가입하기"}
        buttonDisabled={isSubmitting}
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
