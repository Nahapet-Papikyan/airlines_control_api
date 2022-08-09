import { Exclude } from 'class-transformer'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm'

import { UserRoleEnum } from './types'
import { Airline } from '../airline/airline.entity'
import { FlightRequest } from '../flightRequest/flightRequest.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type: 'varchar', length: 60})
  name: string;
  
  @Column({type: 'varchar', length: 60})
  email: string;
  
  @Column({type: 'varchar', length: 128})
  password: string;
  
  @Column({type: 'varchar', length: 60, nullable: true})
  @Exclude()
  token: string | null;
  
  @Column({enum: UserRoleEnum})
  role: UserRoleEnum;
  
  @Exclude()
  @Column({type: 'timestamptz', default: null})
  deletedAt: string;
  
  @Column({type: 'timestamptz', default: null})
  updatedAt: string;
  
  @Column({type: 'timestamptz', default: 'now()'})
  createdAt: string;
  
  @ManyToOne(() => Airline, (airline) => airline.users)
  airline: Airline;
  
  @OneToMany(() => FlightRequest, (flightRequest) => flightRequest.submittedBy)
  submittedFlightRequests: FlightRequest[];
}
