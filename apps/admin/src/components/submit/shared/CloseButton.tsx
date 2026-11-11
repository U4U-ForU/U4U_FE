import styled from "@emotion/styled";
import Image from "next/image";

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <Button type="button" aria-label="닫기" onClick={onClick}>
      <Image
        src={"/icon/closeButton/icon/UI_actions/Vector.svg"}
        width={12}
        height={12}
        alt=""
      />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;
