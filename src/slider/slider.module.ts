import { Module } from '@nestjs/common';
import { SliderController } from './slider.controller';
import { SliderProviders } from './slider.providers';
import { SliderService } from './slider.service';

@Module({
  imports: [],
  controllers: [SliderController],
  providers: [SliderService, ...SliderProviders],
})
export class SliderModule {}
