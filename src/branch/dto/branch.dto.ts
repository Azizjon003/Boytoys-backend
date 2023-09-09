import { IsNotEmpty } from 'class-validator';

export class createBranchDto {
  @IsNotEmpty()
  name: string;
}
