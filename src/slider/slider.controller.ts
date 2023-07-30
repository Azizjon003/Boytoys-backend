import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
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
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          console.log(file);
          const newfileName = `${Date.now()}.${file.mimetype.split('/')[1]}`;
          cb(null, newfileName);
        },
      }),
    }),
  )
  async local(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      data: file.path,
    };
  }
}
