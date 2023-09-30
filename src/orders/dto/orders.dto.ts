import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject, IsUUID } from 'class-validator';

export interface produtcs {
  id: string;
  cuantity: number;
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
