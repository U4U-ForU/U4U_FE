const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\x21-\x7E]{8,20}$/;
const ID = /^[A-Za-z0-9]{4,20}$/;

export const NICKNAME_MIN_LENGTH = 2;
export const NICKNAME_MAX_LENGTH = 20;

export function validateEmail(value: string) {
  if (value === "") return "이메일을 입력해주세요.";
  if (!EMAIL.test(value)) return "이메일 형식이 올바르지 않아요.";
  return "";
}

export function validatePassword(value: string) {
  if (value === "") return "비밀번호를 입력해주세요.";
  if (!PASSWORD.test(value)) {
    return "영문, 숫자, 특수문자를 포함하여 8~20자로 입력해주세요.";
  }
  return "";
}

export function validatePasswordConfirm(value: string, confirmValue: string) {
  if (confirmValue === "") return "비밀번호를 한 번 더 입력해주세요.";
  if (value !== confirmValue) return "비밀번호가 일치하지 않아요.";
  return "";
}

export function validateNickname(value: string) {
  const trimmed = value.trim();

  if (trimmed === "") return "닉네임은 비어있을 수 없습니다.";

  const length = [...trimmed].length;

  if (length < NICKNAME_MIN_LENGTH || length > NICKNAME_MAX_LENGTH) {
    return `닉네임은 ${NICKNAME_MIN_LENGTH}~${NICKNAME_MAX_LENGTH}자만 허용됩니다.`;
  }

  return "";
}

export function validateId(value: string) {
  if (value === "") return "아이디를 입력해주세요.";
  if (!ID.test(value)) return "영문, 숫자 조합 4~20자 이내로 입력해주세요.";
  return "";
}
