import AuthRequestHandler from '../../types/auth';
import { Types } from 'mongoose';

import Post from '../../models/post';
import PostMapper from './mapper';
import { PostCreateDto } from '../../types/dtos/post';

class PostController {
  private postMapper;

  constructor() {
    this.postMapper = new PostMapper();
  }

  createPost(): AuthRequestHandler {
    return async (req, res, next) => {
      const dto: PostCreateDto = { ...req.body };
      try {
        const userId = req.authUser!.userId;
        const post = await Post.create({ ...dto, user: new Types.ObjectId(userId) });
        return res
          .status(201)
          .location(`/api/posts/${post._id.toString()}`)
          .json(this.postMapper.toPostIdResDto(post._id.toString()));
      } catch (e) {
        next(e);
      }
    };
  }
}

export default PostController;
