import { PostIdResDto } from '../../types/dtos/post';

class PostMapper {
  constructor() {}

  toPostIdResDto(postId: string): PostIdResDto {
    return { postId: postId };
  }
}

export default PostMapper;
