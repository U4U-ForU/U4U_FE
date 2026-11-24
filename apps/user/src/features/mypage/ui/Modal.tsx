"use client";

import styled from "@emotion/styled";
import ModalParent from "@/src/shared/ui/modal/ModalParent";
import Coin from "@/src/entities/user/ui/Coin";
import Image from "next/image";
import CloseButton from "@/src/shared/ui/CloseButton";
import { useRef, useState, type ChangeEvent } from "react";
import { useUserStarStore } from "@/src/entities/user/model/useUserStarStore";
import { NICKNAME_MAX_LENGTH, validateNickname } from "@u4u/ui";

const DEFAULT_PROFILE_IMAGE = "/img/ProfileImg.svg";

interface MypageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MypageModal({ isOpen, onClose }: MypageModalProps) {
  const [nickname, setNickname] = useState("닉네임");
  const [draftNickname, setDraftNickname] = useState(nickname);
  const [imageUrl, setImageUrl] = useState(DEFAULT_PROFILE_IMAGE);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const starCount = useUserStarStore((state) => state.starCount);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setIsEditing(false);
    setIsSubmitted(false);
    setDraftNickname(nickname);
    onClose();
  };

  const startEditing = () => {
    setDraftNickname(nickname);
    setIsSubmitted(false);
    setIsEditing(true);
  };

  const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);

    setImageUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);

    setImageUrl(DEFAULT_PROFILE_IMAGE);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = () => {
    setIsSubmitted(true);

    if (validateNickname(draftNickname)) return;

    setNickname(draftNickname.trim());
    setIsEditing(false);
  };

  const nicknameError =
    isEditing && isSubmitted ? validateNickname(draftNickname) : "";

  const avatar = (
    <Avatar
      src={imageUrl}
      width={64}
      height={64}
      alt="프로필"
      unoptimized={imageUrl !== DEFAULT_PROFILE_IMAGE}
    />
  );

  return (
    <ModalParent isOpen={isOpen} onClose={handleClose}>
      <Wrapper>
        <Top>
          <Coin coin={starCount} />
          <ModalCloseButton onClick={handleClose} color="#8E8889" />
        </Top>
        <Character src={"/img/u4u.svg"} width={202} height={192} alt="뽀유" />
        <Bottom>
          <ProfileImage>
            {isEditing ? (
              <>
                <PhotoButton
                  type="button"
                  aria-label="프로필 사진 변경"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {avatar}
                  <PhotoBadge aria-hidden="true">
                    <Image
                      src={"/icon/modify/icon/images/edit.svg"}
                      width={14}
                      height={14}
                      alt=""
                    />
                  </PhotoBadge>
                </PhotoButton>
                {imageUrl !== DEFAULT_PROFILE_IMAGE && (
                  <RemovePhotoButton
                    type="button"
                    aria-label="프로필 사진 삭제"
                    onClick={handleRemoveImage}
                  >
                    <Image
                      src={"/icon/deleteIcon/icon/UI_actions/close.svg"}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </RemovePhotoButton>
                )}
              </>
            ) : (
              avatar
            )}
          </ProfileImage>

          <FileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelectImage}
          />

          <Profile>
            <NameWrapper>
              {isEditing ? (
                <NameField $isError={nicknameError !== ""}>
                  <NameInput
                    aria-label="닉네임"
                    value={draftNickname}
                    maxLength={NICKNAME_MAX_LENGTH}
                    placeholder="닉네임"
                    aria-invalid={nicknameError !== ""}
                    onChange={(event) =>
                      setDraftNickname(
                        event.target.value.slice(0, NICKNAME_MAX_LENGTH),
                      )
                    }
                  />
                </NameField>
              ) : (
                <Name>{nickname}</Name>
              )}

              {isEditing ? (
                <SaveButton type="button" onClick={handleSave}>
                  저장
                </SaveButton>
              ) : (
                <EditButton
                  type="button"
                  aria-label="프로필 수정"
                  onClick={startEditing}
                >
                  <Image
                    src={"/icon/modify/icon/images/edit.svg"}
                    width={24}
                    height={24}
                    alt=""
                  />
                </EditButton>
              )}
            </NameWrapper>
            {nicknameError && (
              <NicknameError role="alert">{nicknameError}</NicknameError>
            )}
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
  position: relative;
  z-index: 1;
  display: flex;
  width: fit-content;
  border: 4px solid #fff;
  border-radius: 50%;
  margin: -36px 0 4px -4px;
`;

const Avatar = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

const PhotoButton = styled.button`
  display: flex;
  position: relative;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const RemovePhotoButton = styled.button`
  position: absolute;
  top: -6px;
  left: -6px;
  z-index: 1;
  display: flex;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const PhotoBadge = styled.span`
  display: flex;
  position: absolute;
  right: -2px;
  bottom: -2px;
  padding: 3px;
  border-radius: 50%;
  border: 1px solid var(--pink-p1, #ffe7e7);
  background: #fff;
`;

const FileInput = styled.input`
  display: none;
`;

const EditButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid var(--pink-p3, #dfafaf);
    outline-offset: 2px;
  }
`;

const SaveButton = styled.button`
  display: flex;
  flex-shrink: 0;
  height: 24px;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--pink-p3, #dfafaf);
  border-radius: var(--radius-sm, 6px);
  background: var(--pink-p1, #ffe7e7);
  color: var(--pink-p4, #a75959);
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const NameField = styled.span<{ $isError: boolean }>`
  position: relative;
  display: flex;
  flex: 1;
  min-width: 0;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3px;
    height: 2px;
    border-radius: 1px;
    background: ${({ $isError }) =>
      $isError ? "var(--color-red-600, #f03e3e)" : "var(--pink-p3, #dfafaf)"};
  }
`;

const NameInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--brown-b3, #6f5e4c);
  font-family: "Cafe24 Ssurround";
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--gray-400, #d0cccc);
  }
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Profile = styled.div``;

const NicknameError = styled.p`
  margin: 2px 0 0;
  color: var(--color-red-600, #f03e3e);
  font-family: Pretendard;
  font-size: var(--typo-body-xsmaill, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

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
  min-height: 107px;
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
