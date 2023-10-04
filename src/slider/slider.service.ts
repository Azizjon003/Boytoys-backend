import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Slider } from './slider.entity';
import { SliderProviders } from './slider.providers';
import { createSliderDto } from './dto/createSlider.dto';
import { langType } from './slider.controller';

@Injectable()
export class SliderService {
  lang;

  async findAll(lang: langType): Promise<Slider[]> {
    const getLang = this.langAttr(lang);

    const sliders = await Slider.findAll({
      attributes: getLang,
    });
    if (sliders.length === 0) {
      throw new NotFoundException('No sliders found');
    }
    return sliders;
  }
  async findOne(id: string, lang: langType): Promise<Slider> {
    this.lang = lang;
    const getLang = this.langAttr(lang);

    const slider = await Slider.findByPk(id, {
      attributes: getLang,
    });
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
    const slider = await this.findOne(id, this.lang);
    if (!slider) {
      throw new NotFoundException('Slider not found');
    }
    slider.name = createSliderDto.name || slider.name;
    slider.name_ru = createSliderDto.name_ru || slider.name_ru;
    slider.name_eng = createSliderDto.name_eng || slider.name_eng;
    slider.description = createSliderDto.description || slider.description;
    slider.description_eng =
      createSliderDto.description_eng || slider.description_eng;
    slider.description_ru =
      createSliderDto.description_ru || slider.description_ru;
    slider.image = createSliderDto.image || slider.image;
    slider.image_eng = createSliderDto.image_eng || slider.image_eng;
    slider.image_ru = createSliderDto.image_ru || slider.image_ru;
    await slider.save();
    return slider;
  }
  async delete(id: string): Promise<HttpStatus> {
    const slider = await this.findOne(id, this.lang);

    await slider.destroy();
    return HttpStatus.NO_CONTENT;
  }

  private langAttr(lang: langType) {
    switch (lang) {
      case 'ru':
        return ['id', 'name_ru', 'description_ru', 'image_ru'];
      case 'eng':
        return ['id', 'name_eng', 'description_eng', 'image_eng'];
      default:
        return ['id', 'name', 'description', 'image'];
    }
  }
}
