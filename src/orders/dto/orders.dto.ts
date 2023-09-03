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
  @IsNotEmpty()
  products: produtcs[];

  @IsNotEmpty()
  @IsNotEmptyObject()
  address: address;

  @IsNotEmpty()
  @IsUUID()
  paymentId: string;

  message: string;
}

export class createOrderPickupDto {
  @IsNotEmpty()
  products: produtcs[];

  @IsNotEmpty()
  @IsUUID()
  deliveryId: string;

  @IsNotEmpty()
  @IsUUID()
  paymentId: string;

  message: string;
}
