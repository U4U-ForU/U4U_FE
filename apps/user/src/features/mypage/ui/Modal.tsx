import styled from "@emotion/styled";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import Coin from "@/src/entities/user/ui/Coin";
import Image from "next/image";
import CloseButton from "@/src/shared/ui/CloseButton";

interface MypageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MypageModal({ isOpen, onClose }: MypageModalProps) {
  return (
    <ModalParent isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <Top>
          <Coin coin={240} />
          <ModalCloseButton onClick={onClose} color="#8E8889" />
        </Top>
        <Character src={"/img/u4u.svg"} width={202} height={192} alt="뽀유" />
        <Bottom>
          <ProfileImage>
            <Image
              src={"/img/ProfileImg.svg"}
              width={64}
              height={64}
              alt="프로필"
            />
          </ProfileImage>
          <Profile>
            <NameWrapper>
              <Name>닉네임</Name>
              <ImageWrapper>
                <Image
                  src={"/icon/modify/icon/images/edit.svg"}
                  width={24}
                  height={24}
                  alt="수정버튼"
                />
              </ImageWrapper>
            </NameWrapper>
            <Id>@maremare</Id>
          </Profile>
        </Bottom>
      </Wrapper>
    </ModalParent>
  );
}

const Character = styled(Image)`
  position: absolute;
  left: 50%;
  bottom: 107px;
  transform: translateX(-50%);
`;

const ProfileImage = styled.div`
  display: flex;
  width: fit-content;
  border: 4px solid #fff;
  border-radius: 50%;
  margin: 0 0 4px -4px;
`;

const ImageWrapper = styled.div`
  display: flex;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Profile = styled.div``;

const Id = styled.div`
  color: var(--gray-600, #8e8889);

  /* body/body-medium */
  font-family: Pretendard;
  font-size: var(--typo-body-medium, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Name = styled.div`
  color: var(--brown-b3, #6f5e4c);
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 24px */
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 320px;
  height: 107px;
  padding: 0 24px 24px;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 2px solid #ffe7e7;
`;

const Wrapper = styled.div`
  width: 320px;
  height: 371px;
  border-radius: var(--radius-md, 12px);
  background: #fff url("/img/background/100.png") center / cover no-repeat;
  padding: 16px 19px;
  position: relative;
  overflow: hidden;
`;

const ModalCloseButton = styled(CloseButton)`
  padding: 0;
`;

const Top = styled.div`
  display: inline-flex;
  height: 40px;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
