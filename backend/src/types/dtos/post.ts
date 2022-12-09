import { Types } from 'mongoose';

export interface PostIdResDto {
  postId: string;
}

export interface PostCreateDto {
  title: string;
  contents: string;
  postImageUrls: string[];
  isPrivate: boolean;
}

export interface PostDetailResDto {
  postId: string;
  title: string;
  contents: string;
  postImageUrls: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    userId: string;
    name: string;
  };
}

export interface PostDetailWithUser {
  _id: Types.ObjectId;
  title: string;
  contents: string;
  postImageUrls: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: Types.ObjectId;
    name: string;
  };
}

export interface PostUpdateDto {
  title: string;
  contents: string;
  postImageUrls: string[];
  isPrivate: boolean;
}
