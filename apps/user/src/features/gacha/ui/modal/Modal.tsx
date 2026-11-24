import styled from "@emotion/styled";
import { Button } from "@u4u/ui";
import StarWrppaer from "./Star/StarWrppaer";
import { useUserStarStore } from "@/src/entities/user/model/useUserStarStore";
import {
  GACHA_DRAW_COST,
  type GachaDrawCount,
} from "@/src/features/gacha/model/types";

interface GachaModalProps {
  drawCount: GachaDrawCount;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function GachaModal({
  drawCount,
  onCancel,
  onConfirm,
}: GachaModalProps) {
  const starCount = useUserStarStore((state) => state.starCount);
  const drawCost = GACHA_DRAW_COST[drawCount];
  const hasEnoughStars = starCount >= drawCost;

  return (
    <Wrapper>
      <Top>
        <Title>{drawCount}회 뽑기</Title>
        <TextWrapper>
          <Text>별 {drawCost}개를 사용하여</Text>
          <Text>{drawCount}회 뽑기를 진행하시겠어요?</Text>
        </TextWrapper>
      </Top>
      <StarWrppaer drawCount={drawCount} />
      {!hasEnoughStars && (
        <Warning role="alert">별이 {drawCost - starCount}개 부족해요.</Warning>
      )}
      <ButtonWrapper>
        <Button
          text="취소"
          fontColor="#B3AEAF"
          backgroundColor="#F9F8F8"
          borderColor="#D0CCCC"
          boxShadow={false}
          onClick={onCancel}
        />
        <Button
          text="확인"
          fontColor="white"
          fontBorderColor="#A75959"
          backgroundColor="#FFD0D0"
          borderColor="#DFAFAF"
          boxShadow={false}
          onClick={onConfirm}
          disabled={!hasEnoughStars}
        />
      </ButtonWrapper>
    </Wrapper>
  );
}

const ButtonWrapper = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
  gap: 12px;
  margin-top: 40px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  width: 320px;
  padding: var(--space-20, 20px);
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: #fff;
`;

const Title = styled.p`
  color: var(--color-gray-0, #fff);
  text-align: center;
  -webkit-text-stroke: 4px var(--pink-p3, #dfafaf);
  paint-order: stroke fill;
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
  margin-top: 0;
  margin-bottom: 0;
`;

const Text = styled.div`
  color: var(--gray-600, #8e8889);
  text-align: center;
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const TextWrapper = styled.div`
  margin-bottom: 20px;
`;

const Warning = styled.p`
  margin: 0;
  color: var(--pink-p4, #a75959);
  text-align: center;
  font-family: Pretendard;
  font-size: var(--typo-body-small, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
