import { UserIdResDto } from '../../types/dtos/user';

class UserMampper {
  constructor() {}

  toUserIdResDto(userId: string): UserIdResDto {
    return { userId: userId };
  }
}

export default UserMampper;
