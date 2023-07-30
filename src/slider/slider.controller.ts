import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SliderService } from './slider.service';
import { Slider } from './slider.entity';
import { createSliderDto } from './dto/createSlider.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}
  @Get('/')
  findAll(): Promise<Slider[]> {
    return this.sliderService.findAll();
  }
  @Post('/')
  create(@Body() createSliderDto: createSliderDto): Promise<Slider> {
    return this.sliderService.create(createSliderDto);
  }
  @Patch('/:id')
  update(
    @Param('id') id: number,
    @Body() createSliderDto: createSliderDto,
  ): Promise<Slider> {
    return this.sliderService.update(id, createSliderDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<HttpStatus> {
    return this.sliderService.delete(id);
  }
}
