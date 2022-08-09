import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'

import { IS_PUBLIC_KEY } from '../decorators/skip.auth'


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  
  handleRequest(err, user, info: Error) {
    if (info) {
      if (info.name === 'TokenExpiredError') {
        throw new UnauthorizedException();
      }
      // In case error not related to token expiration throw simple unauthorized exception
      throw new UnprocessableEntityException({message: info.message, code: 401});
    }
    
    return user
  }
  
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true;
    }
    
    return super.canActivate(context);
  }
}
