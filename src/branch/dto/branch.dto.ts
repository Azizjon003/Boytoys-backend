import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createBranchDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
