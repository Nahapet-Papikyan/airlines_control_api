import { Response } from 'express'
import { Controller, Post, Body, Res } from '@nestjs/common'

import { User } from '../users/user.entity'
import { SignInDto } from './dto/signIn.dto'
import { AuthService } from './auth.service'
import { SkipAuth } from './decorators/skip.auth'
import { ApiProperty, ApiResponse } from '@nestjs/swagger'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @SkipAuth()
  @ApiProperty({ type: SignInDto })
  @ApiResponse({ type: User, headers: { 'x-access-token': { description: 'Bearer token' } } })
  async create(
    @Body() data: SignInDto,
    @Res() res: Response
  ): Promise<User> {
    const {user, accessToken} = await this.authService.signIn(data);
    res.header('x-access-token', accessToken)
    return user
  }
}
