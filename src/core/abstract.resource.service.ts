import { Repository } from 'typeorm'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'

export abstract class AbstractResourceService<Entity> {
  protected constructor(protected readonly repository: Repository<Entity>) {}
  
  async findOneBy(fidOptions: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity> {
    return this.repository.findOneBy(fidOptions)
  }
  
  async save(entity: Entity): Promise<Entity> {
    return this.repository.save(entity)
  }
  
  async remove(criteria: string | string[] | number | number[] | FindOptionsWhere<Entity>): Promise<DeleteResult> {
    return this.repository.delete(criteria)
  }
}