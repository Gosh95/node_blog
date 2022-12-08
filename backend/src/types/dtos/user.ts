export interface UserCreateDto {
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
}

export interface UserIdResDto {
  userId: string;
}

export interface UserDetailResDto {
  userId: string;
  name: string;
  email: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateDto {
  name: string;
  password: string;
}
