import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { createPaymentsDto } from './dto/payments.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @Get('/')
  getAll() {
    return this.paymentService.getAll();
  }

  @Post('/')
  create(@Body(ValidationPipe) createPaymentsDto: createPaymentsDto) {
    return this.paymentService.create(createPaymentsDto);
  }
}
