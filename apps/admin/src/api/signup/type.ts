export interface SignupRequestProps {
  loginId: string;
  password: string;
  email: string;
  nickname: string;
}

export interface SignupResponseProps {
  userId: number;
  loginId: string;
  email: string;
  nickname: string;
}
