import styled from "@emotion/styled";
import Button from "@/src/components/shared/Button";

interface ButtonsProps {
  canSubmit: boolean;
}

export default function Buttons({ canSubmit }: ButtonsProps) {
  return (
    <Wrapper>
      <Button
        text="취소"
        fontColor="#B3AEAF"
        backgroundColor="#F9F8F8"
        boxShadow={false}
        borderColor="#D0CCCC"
      />
      <ConfirmButton
        text="확인"
        fontColor={canSubmit ? "#fff" : "#B3AEAF"}
        backgroundColor={canSubmit ? "#FFD0D0" : "#E0DDDD"}
        borderColor={canSubmit ? "#DFAFAF" : undefined}
        fontBorderColor={canSubmit ? "#A75959" : undefined}
        boxShadow={false}
        disabled={!canSubmit}
      />
    </Wrapper>
  );
}

const ConfirmButton = styled(Button)`
  &:disabled {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 485px;
`;
