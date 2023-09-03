import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/auth.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { getUser } from 'src/auth/getUser.decorator';
import { OrdersService } from './orders.service';
import { createOrderDeliviryDto, createOrderPickupDto } from './dto/orders.dto';

@Controller('checkout')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post('create-delevery')
  @UseGuards(AuthGuard)
  createOrder(
    @getUser() user: Auth,
    @Body(ValidationPipe) createOrderDeliviryDto: createOrderDeliviryDto,
  ) {
    return this.ordersService.createOrderDelivery(
      createOrderDeliviryDto,
      String(user.id),
    );
  }

  @Post('create-pickup')
  @UseGuards(AuthGuard)
  createOrderPickup(
    @getUser() user: Auth,
    @Body(ValidationPipe) createOrderPickupDto: createOrderPickupDto,
  ) {
    return this.ordersService.createOrderPickup(
      createOrderPickupDto,
      String(user.id),
    );
  }
}
