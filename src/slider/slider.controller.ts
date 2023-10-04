import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SliderService } from './slider.service';
import { Slider } from './slider.entity';
import { createSliderDto } from './dto/createSlider.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { updateStatusDto } from './dto/updateStatus.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
export enum langType {
  en = 'eng',
  ru = 'ru',
}

@ApiTags('Slider')
@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}
  @ApiOperation({ summary: 'Get all slider' })
  @ApiResponse({ status: 200, type: [Slider] })
  @Get('/')
  findAll(@Query('lang') lang: langType): Promise<Slider[]> {
    return this.sliderService.findAll(lang);
  }

  @ApiOperation({ summary: 'Create slider' })
  @ApiResponse({ status: 200, type: Slider })
  @Post('/')
  @UsePipes(ValidationPipe)
  create(@Body() createSliderDto: createSliderDto): Promise<Slider> {
    return this.sliderService.create(createSliderDto);
  }

  @ApiOperation({ summary: 'Update slider' })
  @ApiResponse({ status: 200, type: Slider })
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createSliderDto: updateStatusDto,
  ): Promise<Slider> {
    return this.sliderService.update(id, createSliderDto);
  }

  @ApiOperation({ summary: 'Delete slider' })
  @ApiResponse({ status: 200, type: Number })
  @Delete('/:id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<HttpStatus> {
    return this.sliderService.delete(id);
  }

  @ApiOperation({ summary: 'Id by Slider' })
  @ApiResponse({ status: 200, type: Slider })
  @Get('/:id')
  findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('lang') lang: langType,
  ): Promise<Slider> {
    return this.sliderService.findOne(id, lang);
  }
}
