import { isAxiosError } from "axios";

export const TOO_MANY_REQUESTS_MESSAGE =
  "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";

export const NETWORK_ERROR_MESSAGE =
  "서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.";

export class UserFacingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserFacingError";
  }
}

export const isUserFacingError = (error: unknown): error is UserFacingError =>
  error instanceof UserFacingError;

interface ErrorMessageOptions {
  status?: Record<number, string>;
  preferServerMessage?: boolean;
  unknownMessage?: string;
  fallback: string;
}

export function createErrorMessage({
  status = {},
  preferServerMessage = false,
  unknownMessage,
  fallback,
}: ErrorMessageOptions) {
  return (error: unknown) => {
    if (isUserFacingError(error)) return error.message;

    if (!isAxiosError(error)) return unknownMessage ?? fallback;

    if (!error.response) return NETWORK_ERROR_MESSAGE;

    const serverMessage = error.response?.data?.message;

    if (preferServerMessage && typeof serverMessage === "string") {
      return serverMessage;
    }

    const statusCode = error.response?.status;

    if (statusCode && status[statusCode]) return status[statusCode];

    return fallback;
  };
}
