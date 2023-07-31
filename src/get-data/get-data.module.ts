import { Module } from '@nestjs/common';
import { GetDataController } from './get-data.controller';
import { GetDataService } from './get-data.service';
import { getData } from './get-data.entity';
import { GetDataProvider } from './get-data.providers';

@Module({
  controllers: [GetDataController],
  providers: [GetDataService, ...GetDataProvider],
})
export class GetDataModule {}
