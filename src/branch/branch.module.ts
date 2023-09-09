import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { BranchProviders } from './branch.providers';

@Module({
  controllers: [BranchController],
  providers: [BranchService, ...BranchProviders],
})
export class BranchModule {}
