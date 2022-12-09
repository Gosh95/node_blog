import { Request } from 'express';
import { Types } from 'mongoose';

import Post from '../../models/post';
import PostMapper from './mapper';
import AuthRequestHandler from '../../types/auth';
import { PostCreateDto, PostDetailResDto, PostDetailWithUser } from '../../types/dtos/post';

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

  getPostDetail(): AuthRequestHandler {
    return async (req, res, next) => {
      try {
        const postId = this.getPostIdParams(req);
        const postWithUser: PostDetailWithUser = await (await this.findPostById(postId)).populate('user', '_id name');
        return res.status(200).json(this.postMapper.toPostDetailResDto(postWithUser));
      } catch (e) {
        next(e);
      }
    };
  }

  private async findPostById(id: string) {
    const post = await Post.findOne({ _id: new Types.ObjectId(id) });
    if (!post) {
      throw new Error(`Post not found by id. (id: ${id})`);
    }
    return post;
  }

  private getPostIdParams(req: Request) {
    return req.params.postId;
  }
}

export default PostController;
