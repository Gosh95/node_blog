export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInResDto {
  userId: string;
  email: string;
  accessToken: string;
}
