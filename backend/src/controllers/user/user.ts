import { Request, RequestHandler } from 'express';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../../models/user';
import UserMampper from './mapper';
import AuthRequestHandler from '../../types/auth';
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
          roles: ['User'],
        });
        return res.status(201).json(this.userMapper.toUserIdResDto(user._id.toString()));
      } catch (e) {
        next(e);
      }
    };
  }

  getMyPage(): AuthRequestHandler {
    return async (req, res, next) => {
      try {
        const userId = req.authUser!.userId!;
        const user = await this.findUserById(userId);
        return res.status(200).json(this.userMapper.toMyPageResDto(user));
      } catch (e) {
        next(e);
      }
    };
  }

  getUserInfo(): RequestHandler {
    return async (req, res, next) => {
      const userId = this.getUserIdParams(req);
      try {
        const user = await this.findUserById(userId);
        return res.status(200).json(this.userMapper.toUserInfoResDto(user));
      } catch (e) {
        next(e);
      }
    };
  }

  updateUser(): AuthRequestHandler {
    return async (req, res, next) => {
      const userId = this.getUserIdParams(req);
      const dto: UserUpdateDto = { ...req.body };
      try {
        this.checkResourceOwner(userId, req.authUser!.userId!);
        const user = await this.findUserById(userId);
        const isEqualPassword = await this.checkPasswordEquality(dto.password, user.password);
        if (isEqualPassword) {
          throw new Error('Entered password is equal to previous password.');
        }
        await user.updateOne({ name: dto.name, password: dto.password });
        return res.status(200).json(this.userMapper.toUserIdResDto(user._id.toString()));
      } catch (e) {
        next(e);
      }
    };
  }

  deleteUser(): AuthRequestHandler {
    return async (req, res, next) => {
      const userId = this.getUserIdParams(req);
      const dto: UserDeleteDto = { ...req.body };
      try {
        this.checkResourceOwner(userId, req.authUser!.userId!);
        const user = await this.findUserById(userId);
        const isEqualPassword = await this.checkPasswordEquality(dto.password, user.password);
        if (!isEqualPassword) {
          throw new Error('Password is not equal to entered password.');
        }

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
    return await bcrypt.compare(enteredPassword, userPassword);
  }

  private checkResourceOwner(paramUserId: string, authUserId: string) {
    if (paramUserId !== authUserId) {
      throw new Error('Accessor is not the resource owner.');
    }
  }
}

export default UserController;
