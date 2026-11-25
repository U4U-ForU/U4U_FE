import { UserFacingError } from "./errorResponse";

export const FORBIDDEN_LOGIN_MESSAGE = "관리자 계정으로만 로그인할 수 있습니다.";

export const FORBIDDEN_SESSION_MESSAGE =
  "관리자 권한이 없는 계정입니다. 다시 로그인해주세요.";

export class ForbiddenRoleError extends UserFacingError {
  constructor(message: string = FORBIDDEN_LOGIN_MESSAGE) {
    super(message);
    this.name = "ForbiddenRoleError";
  }
}

export const isForbiddenRoleError = (
  error: unknown,
): error is ForbiddenRoleError => error instanceof ForbiddenRoleError;
