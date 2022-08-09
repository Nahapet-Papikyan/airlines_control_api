import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { forwardRef, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common'

import { User } from './user.entity'
import { AuthService } from '../auth/auth.service'
import { AbstractResourceService } from '../core/abstract.resource.service'

@Injectable()
export class UserService extends AbstractResourceService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {
    super(repository);
  }
  
  async create(data: User): Promise<User> {
    const alreadyExistByEmail = await this.findOneBy({email: data.email});
    if (alreadyExistByEmail) {
      throw new UnprocessableEntityException({message: `User with email ${data.email} already exists`});
    }
    return this.save(data);
  }
  
  async verify(token: string): Promise<User> {
    const user = await this.findOneBy({token});
    if (!user) throw new UnprocessableEntityException({message: 'User by token was not found'});
    try {
      await this.authService.checkToken(token);
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
    user.token = null;
    return this.save(user)
  }
  
  async validateUser(email: string): Promise<User> {
    return this.findOneBy({email});
  }
}
