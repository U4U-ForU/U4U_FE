"use client";

import styled from "@emotion/styled";
import type { FormEvent, ReactNode } from "react";
import Button from "@/src/shared/ui/Button";
import BottomArea from "./BottomArea";
import ErrorMessage from "./ErrorMessage";
import Question from "./Question";
import Title from "./Title";

interface AuthFormLayoutProps {
  titles: string[];
  titleAlign?: "left" | "center";
  errorMessage: string;
  buttonText: string;
  buttonDisabled?: boolean;
  question: "회원가입" | "로그인";
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export default function AuthFormLayout({
  titles,
  titleAlign = "left",
  errorMessage,
  buttonText,
  buttonDisabled = false,
  question,
  onSubmit,
  children,
}: AuthFormLayoutProps) {
  return (
    <Wrapper onSubmit={onSubmit}>
      <TitleWrapper $align={titleAlign}>
        {titles.map((title) => (
          <Title key={title} text={title} />
        ))}
      </TitleWrapper>
      <Field>
        {children}
        <ErrorMessage text={errorMessage} />
      </Field>
      <BottomArea>
        <Button
          type="submit"
          text={buttonText}
          fontColor="#FFF"
          backgroundColor="#FFD3D3"
          borderColor="#DFAFAF"
          boxShadow={false}
          fontBorderColor="#C57373"
          disabled={buttonDisabled}
        />
        <Question text={question} />
      </BottomArea>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TitleWrapper = styled.div<{ $align: "left" | "center" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) =>
    $align === "center" ? "center" : "flex-start"};
`;

const Field = styled.div`
  display: flex;
  margin-top: 36px;
  flex-direction: column;
  gap: 8px;
`;
