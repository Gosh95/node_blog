export interface UserCreateDto {
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
}

export interface UserIdResDto {
  userId: string;
}
