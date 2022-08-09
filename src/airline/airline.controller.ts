import { Controller, Delete, Param, } from '@nestjs/common'
import { AirlineService } from './airline.service'

@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.airlineService.remove(+id);
  }
}
