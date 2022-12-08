import { RequestHandler } from 'express';

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

  private async checkEmailDuplicates(email: string) {
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error(`Email is duplicated. (email: ${email})`);
    }
  }
}

export default UserController;
