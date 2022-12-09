import { Schema } from 'mongoose';

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

export interface PostSchema extends TimeStamp {
  title: string;
  contents: string;
  postImageUrls: string[];
  isPrivate: boolean;
  userId: Schema.Types.ObjectId;
}
