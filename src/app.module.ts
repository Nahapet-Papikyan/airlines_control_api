import { Module } from '@nestjs/common'
import configs from './database/configs'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'

import { JwtAuthGuard } from './auth/guards/jwt.guard'
import { ResponseHeaderInterceptor } from './core/interceptors/response.header.interceptor'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './users/user.module'
import { AuthService } from './auth/auth.service'
import { AirlineModule } from './airline/airline.module'
import { DatabaseModule } from './database/database.module'
import { FlightRequestModule } from 'src/flightRequest/flightRequest.module'


@Module({
  imports: [
    UserModule,
    AirlineModule,
    FlightRequestModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    DatabaseModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: (authService: AuthService) => {
        return new ResponseHeaderInterceptor(authService)
      },
      inject: [AuthService],
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
}
