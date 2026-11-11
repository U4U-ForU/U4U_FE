import styled from "@emotion/styled";
import Image from "next/image";
import Badge from "../Item/Badge";
import type { Status } from "../Item/ItemType";
import ModalLayout from "./ModalLayout";
import SubText from "./modalItem/SubText";
import RecombItem from "./modalItem/RecombItem";
import SelectBox from "../shared/SelectBox";
import InfoText from "./modalItem/InfoText";

interface RecombModalProps {
  status: Status;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
}

export default function RecombModal({
  status,
  modalIsOpen,
  setModalIsOpen,
}: RecombModalProps) {
  return (
    <ModalLayout isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
      <Top>
        <SubText text="아이템 제출 심사완료 2026.10.09" />
        <Image
          src={"/icon/closeButton/icon/UI_actions/Vector.svg"}
          width={12}
          height={12}
          alt="닫기 버튼"
          onClick={() => setModalIsOpen(false)}
        />
      </Top>

      <Bottom>
        <ImageBox>
          <Badge text={status} />
          <Image
            src={"/tempImg/itemImg/itemImg.svg"}
            width={400}
            height={400}
            alt="아이템 이미지"
            style={{ cursor: "pointer" }}
          />
        </ImageBox>

        <BottomRight>
          <BottomTop>
            <ItemName style={{ marginBottom: "12px" }}>아이템 이름</ItemName>
            <ImageWrapper>
              <RecombItem text="아이템" />
              <RecombItem text="아이템ㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱ" />
              <RecombItem text="아이템ㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱ" />
            </ImageWrapper>

            <InfoText date="2026.11.11" userName="maremare" />
          </BottomTop>

          <SelectBoxWrapper>
            <SelectBox modalType="수정" />
            <SelectBox modalType="삭제" />
          </SelectBoxWrapper>
        </BottomRight>
      </Bottom>
    </ModalLayout>
  );
}

const BottomTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-bottom: 10px;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const ImageWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

const BottomRight = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 542px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: flex;
  gap: 48px;
`;

const ItemName = styled.div`
  color: #000;
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
`;

const ItemText = styled.div`
  display: flex;
  padding: var(--space-16, 16px) var(--space-20, 20px);
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: var(--radius-md, 12px);
  background: var(--gray-50, #f9f8f8);
  color: #000;

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const ImageBox = styled.div`
  position: relative;
`;
