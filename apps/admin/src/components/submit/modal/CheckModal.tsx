import styled from "@emotion/styled";
import SubText from "./modalItem/SubText";
import SelectBox from "../shared/SelectBox";
import { TYPE_COLORS } from "../shared/SelectBox";

export type CheckType = "거절" | "승인" | "등록";

interface CheckModalProps {
  type: CheckType;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function CheckModal({
  type,
  onCancel,
  onConfirm,
}: CheckModalProps) {
  return (
    <Backdrop
      onClick={(event) => {
        event.stopPropagation();
        onCancel();
      }}
    >
      <Wrapper onClick={(event) => event.stopPropagation()}>
        <Top>
          <Title $colors={TYPE_COLORS[type]}>
            정말 이 아이템을
            <br />
            {type}하시겠습니까?
          </Title>
          <SubText text={`${type} 시 복구가 불가능합니다.`} />
        </Top>
        <SelectBoxWrapper>
          <SelectBox type="취소" width={134} onClick={onCancel} />
          <SelectBox type={type} width={134} onClick={onConfirm} />
        </SelectBoxWrapper>
      </Wrapper>
    </Backdrop>
  );
}

const SelectBoxWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 110;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
`;

const Top = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  width: 320px;
  padding: var(--space-20, 20px);
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  border-radius: 12px;
  background: #fff;
  height: 252px;
`;

const Title = styled.div<{ $colors: { border: string; background: string } }>`
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */

  color: ${({ $colors }) => $colors.border};
`;
