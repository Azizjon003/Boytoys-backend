import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
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

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}
  @Get('/')
  findAll(): Promise<Slider[]> {
    return this.sliderService.findAll();
  }
  @Post('/')
  @UsePipes(ValidationPipe)
  create(@Body() createSliderDto: createSliderDto): Promise<Slider> {
    return this.sliderService.create(createSliderDto);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSliderDto: updateStatusDto,
  ): Promise<Slider> {
    return this.sliderService.update(id, createSliderDto);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus> {
    return this.sliderService.delete(id);
  }
}
