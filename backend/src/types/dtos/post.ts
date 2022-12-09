export interface PostIdResDto {
  postId: string;
}

export interface PostCreateDto {
  title: string;
  contents: string;
  postImageUrls: string[];
  isPrivate: boolean;
}
