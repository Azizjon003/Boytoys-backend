import { IsNotEmpty } from 'class-validator';

export class createPaymentsDto {
  @IsNotEmpty()
  name: string;
}
