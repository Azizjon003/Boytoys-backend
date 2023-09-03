import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderProviders } from './order.providers';

@Module({
  providers: [OrdersService, ...OrderProviders],
  controllers: [OrdersController],
  imports: [],
})
export class OrdersModule {}
