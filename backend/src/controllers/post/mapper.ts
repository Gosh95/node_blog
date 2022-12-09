import { PostDetailResDto, PostDetailWithUser, PostIdResDto } from '../../types/dtos/post';

class PostMapper {
  constructor() {}

  toPostIdResDto(postId: string): PostIdResDto {
    return { postId: postId };
  }

  toPostDetailResDto(post: PostDetailWithUser): PostDetailResDto {
    return {
      postId: post._id.toString(),
      title: post.title,
      contents: post.contents,
      postImageUrls: post.postImageUrls,
      isPrivate: post.isPrivate,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: {
        userId: post.user._id.toString(),
        name: post.user.name,
      },
    };
  }
}

export default PostMapper;
