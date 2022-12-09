export interface UserCreateDto {
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
}

export interface UserIdResDto {
  userId: string;
}

export interface MyPageResDto {
  userId: string;
  name: string;
  email: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoResDto {
  userId: string;
  name: string;
  profileImageUrl: string;
  createdAt: string;
}

export interface UserUpdateDto {
  name: string;
  password: string;
}

export interface UserDeleteDto {
  password: string;
}
