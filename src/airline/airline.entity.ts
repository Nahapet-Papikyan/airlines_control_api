import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../users/user.entity'

@Entity('airlines')
export class Airline {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @OneToMany(() => User, (user) => user.airline)
  users: User[];
  
  @Exclude()
  @Column({type: 'timestamptz', default: null})
  deletedAt: string;
  
  @Column({type: 'timestamptz', default: null})
  updatedAt: string;
  
  @Column({type: 'timestamptz', default: 'now()'})
  createdAt: string;
  
}
