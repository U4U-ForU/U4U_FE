import styled from "@emotion/styled";
import Image from "next/image";

interface ChooseBoxProps {
  selected?: boolean;
  onClick?: () => void;
}

export default function ChooseBox({
  selected = false,
  onClick,
}: ChooseBoxProps) {
  return (
    <Wrapper
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      $selected={selected}
    >
      <Top>
        <ItemName>아이템 이름</ItemName>
        {selected && <Select>선택됨</Select>}
      </Top>

      <Center>
        <Image
          src={"/tempImg/tempItemImg.png"}
          width={100}
          height={100}
          alt="최종 이미지"
        />

        <Image
          src={"/icon/location.svg"}
          width={24}
          height={10}
          alt="최종 이미지"
        />

        <ImageWrapper>
          <Image
            src={"/tempImg/tempItemImg.png"}
            width={50}
            height={50}
            alt="최종 이미지"
          />
          <Image
            src={"/tempImg/tempItemImg.png"}
            width={50}
            height={50}
            alt="최종 이미지"
          />
          <Image
            src={"/tempImg/tempItemImg.png"}
            width={50}
            height={50}
            alt="최종 이미지"
          />
        </ImageWrapper>
      </Center>
    </Wrapper>
  );
}

const Select = styled.div`
  color: var(--brown-b3, #6f5e4c);

  /* body/body-xsmall-bold */
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 18px */
  display: flex;
  padding: 2px var(--space-12, 12px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--radius-full, 999999px);
  border: 1px solid var(--pink-p3, #dfafaf);
  background: var(--pink-p2, #ffd0d0);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Center = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-8, 8px);
`;

const Wrapper = styled.button<{ $selected: boolean }>`
  display: flex;
  padding: var(--space-20, 20px) 26px;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-8, 8px);
  align-self: stretch;
  border-radius: var(--radius-sm, 6px);
  border: 2px solid
    ${({ $selected }) => ($selected ? "#DFAFAF" : "transparent")};
  width: 353px;
  background-color: white;
  color: inherit;
  text-align: left;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  /* shadow/200 */
  box-shadow: 0 0 5px 0 var(--color-opacity-black-15, rgba(0, 0, 0, 0.15));
`;

const ItemName = styled.div`
  color: #000;
  text-align: center;
  font-family: "Cafe24 Ssurround";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;
