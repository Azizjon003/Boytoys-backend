import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentsProviders } from './payment.providers';
import { PaymentController } from './payment.controller';

@Module({
  providers: [PaymentService, ...PaymentsProviders],
  controllers: [PaymentController],
})
export class PaymentModule {}
