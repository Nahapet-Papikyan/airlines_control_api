import { JwtModule } from '@nestjs/jwt'
import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import authConfig from './auth.configs'
import { AuthService } from './auth.service'
import { UserModule } from '../users/user.module'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategiies/jwt.strategy'
import { AirlineModule } from '../airline/airline.module'
import { UserAuthController } from './user.auth.controller'
import { LocalStrategy } from './strategiies/local.strategy'

@Module({
  imports: [
    forwardRef(() => UserModule),
    AirlineModule,
    JwtModule.registerAsync({
      imports   : [ConfigModule.forFeature(authConfig)],
      useFactory: async (configService: ConfigService) =>
        configService.get('jwt'),
      inject    : [ConfigService],
    }),
  ],
  controllers: [AuthController, UserAuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
