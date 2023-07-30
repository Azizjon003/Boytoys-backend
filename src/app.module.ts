import { Module } from '@nestjs/common';

import { GetDataModule } from './get-data/get-data.module';

@Module({
  imports: [GetDataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
