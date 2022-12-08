import { SignInResDto } from '../../types/dtos/auth';

class AuthMapper {
  constructor() {}

  toSignInResDto(userId: string, email: string, accessToken: string): SignInResDto {
    return {
      userId: userId,
      email: email,
      accessToken: accessToken,
    };
  }
}

export default AuthMapper;
