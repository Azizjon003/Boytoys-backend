import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { createBranchDto } from './dto/branch.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Branches')
@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {} // console.log('branch controller');

  @Post('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(@Body(ValidationPipe) createBranchDto: createBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get('/')
  getAll() {
    return this.branchService.getAll();
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  update(
    @Body(ValidationPipe) createBranchDto: createBranchDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.branchService.update(id, createBranchDto);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.branchService.delete(id);
  }
}
