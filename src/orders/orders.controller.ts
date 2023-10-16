import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/auth.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { getUser } from 'src/auth/getUser.decorator';
import { OrdersService } from './orders.service';
import {
  createOrderDeliviryDto,
  createOrderPickupDto,
  updateOrdersDto,
} from './dto/orders.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';

@ApiTags('Checkout')
@Controller('checkout')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('get-address')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getAddress(@getUser() user: Auth, @Body() createGetDataDto: any) {
    return this.ordersService.getAddresses(116516, 1616516515);
  }

  @Post('create-delevery')
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getOrders(@getUser() user: Auth) {
    return this.ordersService.orderMe(String(user.id));
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  getOrder(
    @getUser() user: Auth,
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.ordersService.orderMeId(String(user.id), id);
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  updateOrder(
    @getUser() user: Auth,
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(ValidationPipe) updateOrdersDto: updateOrdersDto,
  ) {
    return this.ordersService.updateOrder(user.id, id, updateOrdersDto);
  }

  // Admin

  @Patch('/update-order-user/:id/:orderId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  updateOrderByUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body(ValidationPipe) updateOrdersDto: updateOrdersDto,
  ) {
    return this.ordersService.updateOrder(id, orderId, updateOrdersDto);
  }
  @Get('/get-orders-user/:id/:orderId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  getOrderByUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.ordersService.orderMeId(id, orderId);
  }
}
