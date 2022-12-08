interface TimeStamp {
  createdAt: string;
  updatedAt: string;
}

export interface UserSchema extends TimeStamp {
  name: string;
  email: string;
  password: string;
  profileImageUrl: string;
}
