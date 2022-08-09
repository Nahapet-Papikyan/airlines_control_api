import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable }           from '@nestjs/common'
import { ConfigService }        from '@nestjs/config'
import { PassportStrategy }     from '@nestjs/passport'

import { iJwtPayload } from '../types'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey     : configService.get('jwt.secret'),
    })
  }

  async validate(payload: iJwtPayload) {
    return { ...payload }
  }
}
