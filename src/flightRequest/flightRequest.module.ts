import { Module } from '@nestjs/common';
import { FlightRequestService } from 'src/flightRequest/flightRequest.service';
import { FlightRequestController } from 'src/flightRequest/flightRequest.controller';

@Module({
  controllers: [FlightRequestController],
  providers: [FlightRequestService],
})
export class FlightRequestModule {}
