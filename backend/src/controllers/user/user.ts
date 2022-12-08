import { Request, RequestHandler } from 'express';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../../models/user';
import UserMampper from './mapper';
import { UserCreateDto, UserDeleteDto, UserUpdateDto } from '../../types/dtos/user';
import { SALT_ROUNDS } from '../../global/consts/hash';

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
        const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
        const user = await User.create({
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          profileImageUrl: dto.profileImageUrl || '',
        });
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

  deleteUser(): RequestHandler {
    return async (req, res, next) => {
      const userId = this.getUserIdParams(req);
      const dto: UserDeleteDto = { ...req.body };
      try {
        const user = await this.findUserById(userId);
        await this.checkPasswordEquality(dto.password, user.password);
        await user.deleteOne();
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

  private async checkPasswordEquality(enteredPassword: string, userPassword: string) {
    const isEqual = await bcrypt.compare(enteredPassword, userPassword);
    if (!isEqual) {
      throw new Error('Password is not equal to entered password.');
    }
  }
}

export default UserController;
