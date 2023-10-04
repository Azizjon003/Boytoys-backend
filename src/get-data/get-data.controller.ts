import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetDataService } from './get-data.service';
import { getData } from './get-data.entity';
import { getDataInterface } from './dto/getData.interface';
import { CreateGetDataDto } from './dto/createData.dto';
import { UpdateGetDataDto } from './dto/updateData.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { langType } from 'src/slider/slider.controller';

@ApiTags('GetData')
@Controller('products')
export class GetDataController {
  constructor(private getDataService: GetDataService) {}

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({ status: 200, type: [getData] })
  @Get()
  findAll(@Query('lang') lang: langType): Promise<getData[]> {
    return this.getDataService.findAll(lang);
  }

  @ApiOperation({ summary: 'Get data by id' })
  @ApiResponse({ status: 200, type: getData })
  @Get('/:id')
  @UsePipes(ValidationPipe)
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('lang') lang: langType,
  ): Promise<getData> {
    console.log(id);
    return this.getDataService.findOne(id, lang);
  }

  @ApiOperation({ summary: 'Create data' })
  @ApiResponse({ status: 200, type: getData })
  @Post('/')
  @UsePipes(ValidationPipe)
  create(@Body() createGetDataDto: CreateGetDataDto): Promise<getData> {
    return this.getDataService.create(createGetDataDto);
  }

  @ApiOperation({ summary: 'Update data' })
  @ApiResponse({ status: 200, type: getData })
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createGetDataDto: UpdateGetDataDto,
  ): Promise<getData> {
    return this.getDataService.update(id, createGetDataDto);
  }

  @ApiOperation({ summary: 'Delete data' })
  @ApiResponse({ status: 200, type: Number })
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.getDataService.delete(id);
  }
}
