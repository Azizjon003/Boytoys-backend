import { createPaymentsDto } from './dto/payments.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { Payments } from './payment.entity';
import { Orders } from 'src/orders/order.entity';

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
    const payments = await Payments.findAll({});
    // if (payments.length === 0)
    //   throw new HttpException('Payments not found', 400);

    return payments;
  }

  async update(createPaymentsDto: createPaymentsDto, id: string) {
    const payment = await Payments.findOne({ where: { id } });
    if (!payment) {
      throw new HttpException('Payment Not Found', 400);
    }
    payment.name = createPaymentsDto.name || payment.name;
    await payment.save();
    return payment;
  }

  async delete(id: string) {
    const payment = await Payments.findOne({ where: { id } });
    if (!payment) {
      throw new HttpException('Payment Not Found', 400);
    }
    await payment.destroy();
    return payment;
  }

  async findOne(id: string) {
    const payment = await Payments.findOne({ where: { id } });
    if (!payment) {
      throw new HttpException('Payment Not Found', 400);
    }
    return payment;
  }
}
