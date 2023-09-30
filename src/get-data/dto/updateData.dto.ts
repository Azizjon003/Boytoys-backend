import { ApiProperty } from '@nestjs/swagger';

export class UpdateGetDataDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  name_ru: string;

  @ApiProperty()
  name_eng: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  price: bigint;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  soldout: number;
  @ApiProperty()
  count: number;

  description: string;

  description_ru: string;

  description_eng: string;
}
