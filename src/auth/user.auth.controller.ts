import { Body, Controller, Param, Post } from '@nestjs/common'

import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { SkipAuth } from './decorators/skip.auth'
import { UserSignupDto } from './dto/user-signup.dto'

@Controller('/api/auth/user')
export class UserAuthController {
  constructor(private readonly authService: AuthService) {
  }
  
  @SkipAuth()
  @Post('/sign-up')
  async create(@Body() registerUserDto: UserSignupDto): Promise<User> {
    return this.authService.signUpUser(registerUserDto);
  }
  
  @SkipAuth()
  @Post('/verify/:token')
  async verifyUser(@Param('token') token: string): Promise<User> {
    return this.authService.verifyUser(token);
  }
}
