import { Injectable, NotFoundException } from '@nestjs/common';
import { Slider } from './slider.entity';
import { SliderProviders } from './slider.providers';
import { createSliderDto } from './dto/createSlider.dto';

@Injectable()
export class SliderService {
  async findAll(): Promise<Slider[]> {
    const sliders = await Slider.findAll();
    if (sliders.length === 0) {
      throw new NotFoundException('No sliders found');
    }
    return sliders;
  }
  async create(createSliderDto: createSliderDto): Promise<Slider> {
    const slider = await Slider.create({
      ...createSliderDto,
    });
    return slider;
  }
}
