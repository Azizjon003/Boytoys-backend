import { IsNotEmpty } from 'class-validator';

export class CreateGetDataDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  name_ru: string;
  @IsNotEmpty()
  name_eng: string;

  images: string[];
  @IsNotEmpty()
  price: bigint;
  discount: number;
  soldout: number;
  count: number;

  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  description_ru: string;
  @IsNotEmpty()
  description_eng: string;
}
