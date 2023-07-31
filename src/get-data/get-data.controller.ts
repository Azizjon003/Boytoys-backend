import { Controller, Get } from '@nestjs/common';
import { GetDataService } from './get-data.service';
import { getData } from './get-data.entity';
import { getDataInterface } from './dto/getData.interface';

@Controller('get-data')
export class GetDataController {
  constructor(private getDataService: GetDataService) {}

  @Get()
  findAll(): Promise<getDataInterface> {
    return this.getDataService.findAll();
  }
}
