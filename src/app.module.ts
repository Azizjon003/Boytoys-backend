import { Module } from '@nestjs/common';

import { GetDataModule } from './get-data/get-data.module';
import { databaseProviders } from './config/sequelize.config';

import { SliderController } from './slider/slider.controller';
import { SliderService } from './slider/slider.service';
import { SliderModule } from './slider/slider.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { GetDataProvider } from './get-data/get-data.providers';
import { GetDataService } from './get-data/get-data.service';
import { OrdersModule } from './orders/orders.module';

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
    AuthModule,
    OrdersModule,
  ],
  controllers: [SliderController, AppController, AuthController],
  providers: [...databaseProviders, SliderService, GetDataService, AuthService],
})
export class AppModule {}
