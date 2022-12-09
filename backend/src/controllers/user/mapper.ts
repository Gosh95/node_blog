import { Types } from 'mongoose';
import { UserSchema } from '../../models/schemas/schemas';
import { UserIdResDto, UserInfoResDto, MyPageResDto } from '../../types/dtos/user';

class UserMampper {
  constructor() {}

  toUserIdResDto(userId: string): UserIdResDto {
    return { userId: userId };
  }

  toMyPageResDto(user: UserSchema & { _id: Types.ObjectId }): MyPageResDto {
    return {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  toUserInfoResDto(user: UserSchema & { _id: Types.ObjectId }): UserInfoResDto {
    return {
      userId: user._id.toString(),
      name: user.name,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt,
    };
  }
}

export default UserMampper;
