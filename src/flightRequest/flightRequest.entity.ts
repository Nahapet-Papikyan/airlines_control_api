import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../users/user.entity';
import { FlightRequestStatusEnum } from './types';

@Entity('flyRequests')
export class FlightRequest {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column({type: 'varchar', length: '128'})
  from: string;
  
  @Column({type: 'varchar', length: '128'})
  to: string;
  
  @Column({type: 'timestamptz'})
  takeoffDate: string;
  
  @Column({type: 'timestamptz'})
  landingDate: string;
  
  @Column({enum: FlightRequestStatusEnum})
  status: FlightRequestStatusEnum;
  
  @Column({type: 'timestamptz', default: null})
  updatedAt: string;
  
  @Column({type: 'timestamptz', default: 'now()'})
  createdAt: string;
  
  @ManyToMany(() => FlightRequest)
  @JoinTable({joinColumn: {name: 'related_flight_request_id'}})
  relatedFlightRequest: FlightRequest;
  
  @ManyToOne(() => User, (user) => user.submittedFlightRequests)
  submittedBy: User;
  
  @ManyToOne(() => User, (user) => user.submittedFlightRequests)
  editedBy: User;
}
