import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import User from '../../models/user';
import UserMampper from './mapper';
import { UserCreateDto } from '../../types/dtos/user';

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
      const userId = req.params.userId;
      try {
        const user = await this.findUserById(userId);
        return res.status(200).json(this.userMapper.toUserDetailResDto(user));
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
}

export default UserController;
