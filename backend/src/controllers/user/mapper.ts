import { Types } from 'mongoose';
import { UserSchema } from '../../models/schemas/schemas';
import { UserIdResDto, UserDetailResDto } from '../../types/dtos/user';

class UserMampper {
  constructor() {}

  toUserIdResDto(userId: string): UserIdResDto {
    return { userId: userId };
  }

  toUserDetailResDto(user: UserSchema & { _id: Types.ObjectId }): UserDetailResDto {
    return {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export default UserMampper;
