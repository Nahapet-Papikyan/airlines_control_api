import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { forwardRef, Inject, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'

import { iJwtPayload } from './types'
import { User } from '../users/user.entity'
import { SignInDto } from './dto/signIn.dto'
import { UserService } from '../users/user.service'
import { UserSignupDto } from './dto/user-signup.dto'
import { AirlineService } from '../airline/airline.service'

@Injectable()
export class AuthService {
  
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly airlineService: AirlineService,
  ) {
  }
  
  async signUpUser(data: UserSignupDto): Promise<User> {
    const { userData, airlineData } = await data.transform();
    try {
      await this.airlineService.create(airlineData)
      userData.token = await this.jwtService.sign(userData, { expiresIn: '1d' });
      return await this.userService.create(userData);
    } catch (e) {
      await this.airlineService.remove({ name: airlineData.name });
      await this.userService.remove({ email: userData.email });
      throw new UnprocessableEntityException(e);
    }
  }
  
  async verifyUser(token: string): Promise<User> {
    return await this.userService.verify(token);
  }
  
  async signIn({email, password}: SignInDto): Promise<{ user: User, accessToken: string }> {
    const user = await this.userService.findOneBy({ email });
    if (!user) throw new UnauthorizedException({ message: 'Email or password was incorrect' });
    if (user.token) throw new UnauthorizedException({ message: 'Please complete verification or reset password steps' });
    const isPasswordEqual = await compare(password, user.password);
    if (!isPasswordEqual) throw new UnauthorizedException({ message: 'Email or password was incorrect' });
    return {
      user,
      accessToken: this.getAccessToken(user)
    };
  }
  
  tokenToPayload(token: string): iJwtPayload {
    return Object.assign(new iJwtPayload(), this.jwtService.decode(token));
  }
  
  getAccessToken(payload: iJwtPayload): string {
    return this.jwtService.sign(this.buildTokenPayload(payload));
  }
  
  async checkToken(token: string): Promise<User> {
    return this.jwtService.verify(token);
  }
  
  protected buildTokenPayload(payload: iJwtPayload): iJwtPayload {
    return {
      ...payload,
    };
  }
  
}
