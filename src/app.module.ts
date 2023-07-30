import { Module } from '@nestjs/common';

import { GetDataModule } from './get-data/get-data.module';
import { databaseProviders } from './config/sequelize.config';

import { SliderController } from './slider/slider.controller';
import { SliderService } from './slider/slider.service';
import { SliderModule } from './slider/slider.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
      serveStaticOptions: {
        redirect: true,
        index: false,
      },
    }),
    GetDataModule,
    SliderModule,
  ],
  controllers: [SliderController, AppController],
  providers: [...databaseProviders, SliderService],
})
export class AppModule {}
