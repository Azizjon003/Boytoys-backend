import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGetDataDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  name_ru: string;
  @ApiProperty()
  @IsNotEmpty()
  name_eng: string;

  @ApiProperty()
  images: string[];
  @ApiProperty()
  @IsNotEmpty()
  price: bigint;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  soldout: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty()
  @IsNotEmpty()
  description_eng: string;
}
