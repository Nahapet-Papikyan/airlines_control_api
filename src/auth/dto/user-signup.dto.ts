import { ApiProperty } from '@nestjs/swagger'
import { hash } from 'typeorm/util/StringUtils'
import { TransformPlainToInstance } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Length, Matches, } from 'class-validator'

import { User } from '../../users/user.entity'
import { UserRoleEnum } from '../../users/types'
import { UserAndAirline } from '../types/auth.classes'
import { Airline } from '../../airline/airline.entity'
import { Match } from '../../core/custoDecorators/matches.decorator'

export class UserSignupDto {
  @ApiProperty()
  @IsNotEmpty()
  airlineName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @Length(3)
  name: string;
  
  @ApiProperty()
  @ApiProperty({
    description:
      'This is an airline\'s admin user email address to verify their account',
  })
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsString()
  @Length(6, 18)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must contain numbers, letters (uppercase, lowercase) and symbols',
  })
  password: string;
  
  @ApiProperty()
  @IsString()
  @Length(6, 18)
  @Match('password')
  passwordConfirm: string;
  
  @TransformPlainToInstance(UserAndAirline)
  async transform(): Promise<UserAndAirline> {
    this.password = await hash(this.password, { length: 20 })
    return {
      userData: { ...new User(), name: this.name, email: this.email, password: this.password, role: UserRoleEnum.user},
      airlineData: { ...new Airline(), name: this.airlineName, }
    }
  }
  
}
