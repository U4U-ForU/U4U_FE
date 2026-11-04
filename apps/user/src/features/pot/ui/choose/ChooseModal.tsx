"use client";

import styled from "@emotion/styled";
import Modal from "@/src/shared/ui/modal/ModalParent";
import Image from "next/image";
import ItemList from "./modalitem/ItemList";
import Button from "@/src/shared/ui/Button";
import CloseButton from "@/src/shared/ui/CloseButton";

interface ChooseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ChooseModal({
  isOpen,
  onClose,
  onConfirm,
}: ChooseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <Top>
          <ModalCloseButton onClick={onClose} />
        </Top>

        <ItemList />

        <DownArrow
          src={"/icon/location.svg"}
          width={24}
          height={11}
          alt=""
          aria-hidden="true"
        />

        <ResultItem>
          <ResultImageRow>
            <Image
              src={"/icon/result.svg"}
              width={14}
              height={59}
              alt=""
              aria-hidden="true"
            />
            <Image
              src={"/tempImg/tempItemImg.png"}
              width={172}
              height={172}
              alt="결과 아이템"
            ></Image>
            <RightEffect
              src={"/icon/result.svg"}
              width={14}
              height={59}
              alt=""
              aria-hidden="true"
            />
          </ResultImageRow>
          <Text>아이템 이름</Text>
        </ResultItem>

        <FullWidthButton
          text="조합법 선택하기"
          fontColor="white"
          fontBorderColor="#A75959"
          borderColor="#DFAFAF"
          backgroundColor="#FFD0D0"
          boxShadow={false}
          onClick={onConfirm}
        />
      </Wrapper>
    </Modal>
  );
}

const FullWidthButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const ResultItem = styled.div`
  display: flex;
  align-self: center;
  margin-top: 8px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ResultImageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RightEffect = styled(Image)`
  transform: scaleX(-1);
`;

const Text = styled.div`
  color: var(--brown-b3, #6f5e4c);
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  margin-top: 4px;
`;

const DownArrow = styled(Image)`
  align-self: center;
  margin: calc(14px + 6.5px) 0 6.5px;
  transform: rotate(-90deg);
`;

const ModalCloseButton = styled(CloseButton)`
  padding: 0;
`;

const Top = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 16px;
  height: 24px;
  align-items: center;
`;

const Wrapper = styled.div`
  display: inline-flex;
  padding: 12px 24px 24px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: var(--radius-md, 12px);
  background: #fff;
  width: 320px;
`;
