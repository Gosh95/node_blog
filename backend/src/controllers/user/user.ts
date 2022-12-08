import { Request, RequestHandler } from 'express';
import { Types } from 'mongoose';

import User from '../../models/user';
import UserMampper from './mapper';
import { UserCreateDto, UserUpdateDto } from '../../types/dtos/user';

class UserController {
  private userMapper;

  constructor() {
    this.userMapper = new UserMampper();
  }

  createUser(): RequestHandler {
    return async (req, res, next) => {
      const dto: UserCreateDto = { ...req.body };
      try {
        await this.checkEmailDuplicates(dto.email);

        const user = await User.create({ ...dto });
        return res.status(201).json(this.userMapper.toUserIdResDto(user._id.toString()));
      } catch (e) {
        next(e);
      }
    };
  }

  getUserDetail(): RequestHandler {
    return async (req, res, next) => {
      const userId = this.getUserIdParams(req);
      try {
        const user = await this.findUserById(userId);
        return res.status(200).json(this.userMapper.toUserDetailResDto(user));
      } catch (e) {
        next(e);
      }
    };
  }

  updateUser(): RequestHandler {
    return async (req, res, next) => {
      const userId = this.getUserIdParams(req);
      const dto: UserUpdateDto = { ...req.body };
      try {
        const user = await this.findUserById(userId);
        await user.updateOne({ name: dto.name, password: dto.password });
        return res.status(200).json(this.userMapper.toUserIdResDto(user._id.toString()));
      } catch (e) {
        next(e);
      }
    };
  }

  private async checkEmailDuplicates(email: string) {
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error(`Email is duplicated. (email: ${email})`);
    }
  }

  private async findUserById(id: string) {
    const user = await User.findOne({ _id: new Types.ObjectId(id) });
    if (!user) {
      throw new Error(`User not found by id. (id: ${id})`);
    }
    return user;
  }

  private getUserIdParams(req: Request) {
    return req.params.userId;
  }
}

export default UserController;
