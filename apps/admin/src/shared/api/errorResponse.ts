import { isAxiosError } from "axios";

export const TOO_MANY_REQUESTS_MESSAGE =
  "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";

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
    if (!isAxiosError(error)) return unknownMessage ?? fallback;

    const serverMessage = error.response?.data?.message;

    if (preferServerMessage && typeof serverMessage === "string") {
      return serverMessage;
    }

    const statusCode = error.response?.status;

    if (statusCode && status[statusCode]) return status[statusCode];

    return fallback;
  };
}
