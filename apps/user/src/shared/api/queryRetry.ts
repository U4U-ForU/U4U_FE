import { isAxiosError } from "axios";

const MAX_RETRY_COUNT = 3;
const RETRYABLE_CLIENT_STATUSES = [408, 429];

export const retryQuery = (failureCount: number, error: unknown) => {
  if (failureCount >= MAX_RETRY_COUNT) return false;

  if (!isAxiosError(error)) return false;

  const status = error.response?.status;

  if (status === undefined) return true;

  if (status >= 400 && status < 500) {
    return RETRYABLE_CLIENT_STATUSES.includes(status);
  }

  return true;
};
