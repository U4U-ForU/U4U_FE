"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import { Button, ErrorMessage, Question, Title } from "@u4u/ui";
import { markReplace } from "@/src/shared/lib/navStack";
import BackButton from "./BackButton";

interface AuthFormLayoutProps {
  titles: string[];
  titleAlign?: "left" | "center";
  errorMessage: string;
  buttonText: string;
  buttonDisabled?: boolean;
  question: "회원가입" | "로그인";
  onBack?: () => void;
  navDisabled?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export default function AuthFormLayout({
  titles,
  titleAlign = "center",
  errorMessage,
  buttonText,
  buttonDisabled = false,
  question,
  onBack,
  navDisabled = false,
  onSubmit,
  children,
}: AuthFormLayoutProps) {
  return (
    <Wrapper onSubmit={onSubmit}>
      <Header>
        <Image
          src="/logo/logo.png"
          width={123}
          height={55}
          alt="U4U"
          priority
        />
        <TitleWrapper $align={titleAlign}>
          {titles.map((title) => (
            <Title key={title} text={title} />
          ))}
        </TitleWrapper>
      </Header>

      <Card $hasBack={!!onBack}>
        {onBack && <BackButton onClick={onBack} disabled={navDisabled} />}
        <Field>
          {children}
          <ErrorMessage text={errorMessage} />
        </Field>
        <Submit
          type="submit"
          text={buttonText}
          fontColor="#FFF"
          backgroundColor="#FFD3D3"
          borderColor="#DFAFAF"
          boxShadow={false}
          fontBorderColor="#C57373"
          disabled={buttonDisabled}
        />
        <Question
          text={question}
          onBeforeNavigate={markReplace}
          disabled={navDisabled}
        />
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const TitleWrapper = styled.div<{ $align: "left" | "center" }>`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: ${({ $align }) =>
    $align === "center" ? "center" : "flex-start"};
`;

const Card = styled.div<{ $hasBack: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  padding: ${({ $hasBack }) => ($hasBack ? "56px 32px 32px" : "32px")};
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  border: 2px solid var(--pink-p1, #ffe7e7);
  background: #fff;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.08);
`;

const Field = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

const Submit = styled(Button)`
  && {
    width: 100%;
    height: 56px;
  }
`;
