import { getData } from 'src/get-data/get-data.entity';
import {
  createOrderDeliviryDto,
  createOrderPickupDto,
  produtcs,
  typesAddres,
  updateOrdersDto,
} from './dto/orders.dto';
import * as fs from 'fs';
import { HttpException, Injectable } from '@nestjs/common';
import { Orders } from './order.entity';
import { CreateGetDataDto } from 'src/get-data/dto/createData.dto';
import { Payments } from 'src/payment/payment.entity';
import { Branch } from 'src/branch/branch.entity';
import { Auth } from 'src/auth/auth.entity';

@Injectable()
export class OrdersService {
  async createOrderDelivery(
    createOrderDeliviryDto: createOrderDeliviryDto,
    id: string,
  ) {
    const products = createOrderDeliviryDto.products;
    const isProduct = await this.checkProduct(products);
    if (!isProduct) {
      throw new HttpException('Product not found', 400);
    }
    const body = {
      products: createOrderDeliviryDto.products,
      address: createOrderDeliviryDto.address,
      paymentId: createOrderDeliviryDto.paymentId,
      message: createOrderDeliviryDto.message,
      userId: id,
      type: 'delivery',
    };
    let order = await Orders.create(body);

    const { total, product } = await this.total(products);
    order.products = product;
    return {
      order: order,
      total: total,
    };
  }

  async createOrderPickup(
    createOrderPickupDto: createOrderPickupDto,
    id: string,
  ) {
    const products = createOrderPickupDto.products;

    const isProduct = await this.checkProduct(products);
    if (!isProduct) {
      throw new HttpException('Product not found', 400);
    }

    const body = {
      products: createOrderPickupDto.products,
      deliveryId: createOrderPickupDto.deliveryId,
      paymentId: createOrderPickupDto.paymentId,
      message: createOrderPickupDto.message,
      userId: id,
      type: 'pickup',
    };

    let order = await Orders.create(body);

    const { total, product } = await this.total(products);
    order.products = product;
    return {
      order: order,
      total: total,
    };
  }

  async orderMe(id: string) {
    let order = await Orders.findAll({
      where: {
        userId: id,
      },
    });

    return order;
  }

  async orderMeId(id: string, orderId: string) {
    let order = await Orders.findOne({
      include: [Payments, Branch],
      where: {
        userId: id,
        id: orderId,
      },
    });

    console.log(order);
    // fs.writeFileSync('order.json', JSON.stringify(order));
    if (!order) {
      throw new HttpException('Order not found', 400);
    }
    const { total, product } = await this.total(order.products);

    order.products = product;
    return {
      order: order,
      total: total,
    };
  }

  async updateOrder(
    id: string,
    orderId: string,
    updateOrdersDto: updateOrdersDto,
  ) {
    let order = await Orders.findOne({
      include: [
        {
          model: Payments,
          attributes: ['name', 'id'], // attributes: ['name', 'id'],
          as: 'payment',
        },
        {
          model: Branch,
          attributes: ['name', 'id'],
          as: 'delivery',
        },
      ],
      where: {
        userId: id,
        id: orderId,
        type: updateOrdersDto.type,
      },
    });
    if (!order) {
      throw new HttpException('Order not found', 400);
    }

    console.log(order);
    order.products = updateOrdersDto.products || order.products;

    order.paymentId = updateOrdersDto.paymentId || order.paymentId;
    order.status = updateOrdersDto.status || order.status;
    if (updateOrdersDto.type === typesAddres.delivery) {
      order.address = updateOrdersDto.address || order.address;
    } else {
      if (updateOrdersDto.type === typesAddres.pickup) {
        order.deliveryId = updateOrdersDto.deliveryId || order.deliveryId;
      } else {
        throw new HttpException('type is not defined', 400);
      }
    }

    await order.save();

    const { total, product } = await this.total(order.products);

    order.products = product;
    return {
      order: order,
      total: total,
    };
  }

  async getAddresses(letitude: number, longitude: number) {
    return {
      address: 'Toshkent viloyati',
    };
  }

  private async checkProduct(products: produtcs[]) {
    for (let i = 0; i < products.length; i++) {
      const product = await getData.findOne({
        where: {
          id: products[i].id,
        },
      });

      if (!product) {
        throw new HttpException('Product not found', 400);
      }
    }

    return true;
  }

  private async total(products: produtcs[]) {
    console.log(products);
    let total = 0;
    const produc: {
      product: CreateGetDataDto;
      cuantity: number;
    }[] = [];
    for (let i = 0; i < products.length; i++) {
      const product = await getData.findOne({
        where: {
          id: products[i].id,
        },
      });

      console.log(product);
      produc.push({
        product: product,
        cuantity: products[i].cuantity,
      });

      total += Number(product.price) * products[i].cuantity;
    }

    return { total, product: produc };
  }
}
