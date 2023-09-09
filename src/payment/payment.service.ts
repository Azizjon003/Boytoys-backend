import { createPaymentsDto } from './dto/payments.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { Payments } from './payment.entity';

@Injectable()
export class PaymentService {
  async create(createPaymentsDto: createPaymentsDto) {
    const { name } = createPaymentsDto;

    const payment = await Payments.create({
      name,
    });
    return payment;
  }

  async getAll() {
    const payments = await Payments.findAll();
    if (payments.length === 0)
      throw new HttpException('Payments not found', 400);

    return payments;
  }

  async update() {}

  async delete() {
    return 'delete';
  }
}
