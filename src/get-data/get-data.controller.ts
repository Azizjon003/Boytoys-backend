import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetDataService } from './get-data.service';
import { getData } from './get-data.entity';
import { getDataInterface } from './dto/getData.interface';
import { CreateGetDataDto } from './dto/createData.dto';
import { UpdateGetDataDto } from './dto/updateData.dto';

@Controller('get-data')
export class GetDataController {
  constructor(private getDataService: GetDataService) {}

  @Get()
  findAll(): Promise<getDataInterface> {
    return this.getDataService.findAll();
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<getData> {
    console.log(id);
    return this.getDataService.findOne(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  create(@Body() createGetDataDto: CreateGetDataDto): Promise<getData> {
    return this.getDataService.create(createGetDataDto);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createGetDataDto: UpdateGetDataDto,
  ): Promise<getData> {
    return this.getDataService.update(id, createGetDataDto);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.getDataService.delete(id);
  }
}
