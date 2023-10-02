import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsUUID,
  isUUID,
} from 'class-validator';

export interface produtcs {
  id: string;
  cuantity: number;
}
export enum typesAddres {
  delivery = 'delivery',
  pickup = 'pickup',
}

interface address {
  address: string;
  city: string;
  district: string;
  ward: string;
  landMark: string;
}

export class createOrderDeliviryDto {
  @ApiProperty()
  @IsNotEmpty()
  products: produtcs[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmptyObject()
  address: address;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  paymentId: string;

  @ApiProperty()
  message: string;
}

export class createOrderPickupDto {
  @ApiProperty()
  @IsNotEmpty()
  products: produtcs[];

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  deliveryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  paymentId: string;

  @ApiProperty()
  message: string;
}

export class updateOrdersDto {
  @ApiProperty()
  products: produtcs[];

  @ApiProperty()
  @IsNotEmptyObject()
  address: address;

  @ApiProperty()
  @IsUUID()
  paymentId: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  deliveryId: string;

  @ApiProperty()
  @IsEnum(typesAddres)
  type: typesAddres;

  @ApiProperty()
  @IsEnum(['pending', 'success', 'cancel', 'delivered'])
  status: string;
}
