import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('')
export class AppController {
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
    const url = `https://boytoy.fly.dev/img/${file.filename}`;
    return {
      status: 'success',
      url: url,
    };
  }
}
