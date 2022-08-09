import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

import { Airline } from './airline.entity'
import { AbstractResourceService } from '../core/abstract.resource.service'

@Injectable()
export class AirlineService extends AbstractResourceService<Airline>{
  
  constructor(
    @InjectRepository(Airline)
    protected readonly repository: Repository<Airline>
  ) {
    super(repository)
  }
  
  async create(data: Airline): Promise<Airline> {
    const alreadyExistByName = await this.findOneBy({ name: data.name });
    if (alreadyExistByName) {
      throw new UnprocessableEntityException({ message: `Airline Company with name ${data.name} already exists` });
    }
    return this.save(data);
  }
  
}
