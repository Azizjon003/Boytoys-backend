import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Slider } from './slider.entity';
import { SliderProviders } from './slider.providers';
import { createSliderDto } from './dto/createSlider.dto';

@Injectable()
export class SliderService {
  async findAll(): Promise<Slider[]> {
    const sliders = await Slider.findAll({
      attributes: ['id', 'name', 'name_ru', 'name_eng'],
    });
    if (sliders.length === 0) {
      throw new NotFoundException('No sliders found');
    }
    return sliders;
  }
  async findOne(id: string): Promise<Slider> {
    const slider = await Slider.findByPk(id);
    if (!slider) {
      throw new NotFoundException('Slider not found');
    }
    return slider;
  }
  async create(createSliderDto: createSliderDto): Promise<Slider> {
    const slider = new Slider();
    slider.name = createSliderDto.name;
    slider.name_ru = createSliderDto.name_ru;
    slider.name_eng = createSliderDto.name_eng;
    slider.description = createSliderDto.description;
    slider.description_eng = createSliderDto.description_eng;
    slider.description_ru = createSliderDto.description_ru;
    slider.image = createSliderDto.image;
    slider.image_eng = createSliderDto.image_eng;
    slider.image_ru = createSliderDto.image_ru;
    await slider.save();
    return slider;
  }
  async update(id, createSliderDto: createSliderDto): Promise<Slider> {
    const slider = await this.findOne(id);
    if (!slider) {
      throw new NotFoundException('Slider not found');
    }
    slider.name = createSliderDto.name || slider.name;
    slider.name_ru = createSliderDto.name_ru || slider.name_ru;
    slider.name_eng = createSliderDto.name_eng || slider.name_eng;
    await slider.save();
    return slider;
  }
  async delete(id: string): Promise<HttpStatus> {
    const slider = await this.findOne(id);

    await slider.destroy();
    return HttpStatus.NO_CONTENT;
  }
}
