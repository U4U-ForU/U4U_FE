import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface RightBubbleProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export default function RightBubble({
  children,
  className,
  onClick,
}: RightBubbleProps) {
  return (
    <Wrapper type="button" className={className} onClick={onClick}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  position: relative;
  display: flex;
  width: 95px;
  height: 75px;
  padding: 0 0 20px;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
  background-image: url("/img/BubbleBoxRight.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  color: var(--brown-b3, #6f5e4c);
  font-family: "Cafe24 Ssurround";
  font-size: 20px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
