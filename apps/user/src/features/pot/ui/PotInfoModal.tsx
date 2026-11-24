"use client";

import styled from "@emotion/styled";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import CloseButton from "@/src/shared/ui/CloseButton";

interface PotInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GUIDES = [
  {
    title: "아이템 섞기",
    text: "아이템 4개를 넣고 섞으면 뽀유가 새로운 아이템 하나를 만들어줘요.",
  },
  {
    title: "아이템 재조합",
    text: "원하는 조합법을 고르고 재료 3개를 채우면 조합법에 명시된 아이템 하나로 바꿀 수 있어요.",
  },
];

export default function PotInfoModal({ isOpen, onClose }: PotInfoModalProps) {
  return (
    <ModalParent isOpen={isOpen} onClose={onClose}>
      <Wrapper role="dialog" aria-label="가마솥 안내">
        <Panel>
          <Top>
            <Title>가마솥 사용법</Title>
            <PanelCloseButton onClick={onClose} color="#DFAFAF" />
          </Top>

          <StepList>
            {GUIDES.map(({ title, text }, index) => (
              <Step key={title}>
                <StepNumber aria-hidden="true">{index + 1}</StepNumber>
                <StepBody>
                  <StepTitle>{title}</StepTitle>
                  <StepText>{text}</StepText>
                </StepBody>
              </Step>
            ))}
          </StepList>

          <Notice>재료는 인벤토리에 있는 아이템 중에서 고를 수 있어요.</Notice>
        </Panel>
      </Wrapper>
    </ModalParent>
  );
}

const Wrapper = styled.div`
  width: 320px;
  box-sizing: border-box;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px 20px;
  border-radius: 20px;
  border: 2px solid var(--pink-p1, #ffe7e7);
  background: #fff;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  color: var(--brown-b3, #6f5e4c);
  font-family: "Cafe24 Ssurround";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const PanelCloseButton = styled(CloseButton)`
  margin-right: -10px;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Step = styled.div`
  display: flex;
  gap: 10px;
  padding: 14px 0;

  & + & {
    border-top: 1px dashed var(--pink-p2, #ffd0d0);
  }
`;

const StepNumber = styled.div`
  display: flex;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: var(--pink-p3, #dfafaf);
  color: #fff;
  font-family: "Cafe24 Ssurround";
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
`;

const StepBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StepTitle = styled.div`
  color: var(--pink-p4, #a75959);
  font-family: "Cafe24 Ssurround";
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const StepText = styled.div`
  color: var(--gray-600, #8e8889);
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  word-break: keep-all;
`;

const Notice = styled.div`
  margin-top: 4px;
  padding: 10px 12px;
  border-radius: var(--radius-sm, 6px);
  background: var(--pink-p1, #ffe7e7);
  color: var(--pink-p4, #a75959);
  text-align: center;
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  word-break: keep-all;
`;
