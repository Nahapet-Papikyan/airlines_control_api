import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ExtractJwt } from 'passport-jwt'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

import { AuthService } from "../../auth/auth.service"


@Injectable()
export class ResponseHeaderInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {
  }
  
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    let user = null
    const request = context.switchToHttp().getRequest()
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request)
    if (token && request.user) {
      const jwtUser = this.authService.tokenToPayload(token)
      if (jwtUser && jwtUser.email) {
        // @ts-ignore
        user = await this.authService.getValidUser(jwtUser)
        return next.handle().pipe(
          tap(() => {
            const res = context.switchToHttp().getResponse()
            if (user) {
              res.header(
                'x-access-token',
                this.authService.getAccessToken(user),
              )
            }
          }),
        )
      }
    }
    return next.handle()
  }
}
