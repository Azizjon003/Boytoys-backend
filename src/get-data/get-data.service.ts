import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { getData } from './get-data.entity';
import { Slider } from 'src/slider/slider.entity';
import { getDataInterface } from './dto/getData.interface';
import { CreateGetDataDto } from './dto/createData.dto';

import { langType } from 'src/slider/slider.controller';
// import { GetDataProvider } from './get-data.providers';

@Injectable()
export class GetDataService {
  lang;
  // constructor(private getDataRepository: GetDataProvider) {}
  async findAll(lang: langType): Promise<getData[]> {
    const getLang = this.langAttr(lang);
    // const data = await getData.findAll();
    // const slider = await Slider.findAll();
    const data = await getData.findAll({
      attributes: getLang,
    });

    return data;
  }

  async findOne(id: string, lang: langType): Promise<getData> {
    this.lang = lang;
    const getLang = this.langAttr(lang);
    const data = await getData.findOne({
      attributes: getLang,
      where: {
        id,
      },
    });
    if (!data) {
      throw new NotFoundException(`Data with id ${id} not found`);
    }
    return data;
  }

  async create(createGetDataDto: CreateGetDataDto): Promise<getData> {
    const data = new getData();
    data.name = createGetDataDto.name;
    data.name_ru = createGetDataDto.name_ru;
    data.name_eng = createGetDataDto.name_eng;
    data.images = createGetDataDto.images;
    data.price = createGetDataDto.price;
    data.discount = createGetDataDto.discount;
    data.soldout = createGetDataDto.soldout;
    data.count = createGetDataDto.count;
    data.description = createGetDataDto.description;
    data.description_ru = createGetDataDto.description_ru;
    data.description_eng = createGetDataDto.description_eng;

    await data.save();
    return data;
  }

  async update(
    id: string,
    createGetDataDto: CreateGetDataDto,
  ): Promise<getData> {
    const data = await this.findOne(id, this.lang);
    data.name = createGetDataDto.name || data.name;
    data.name_ru = createGetDataDto.name_ru || data.name_ru;
    data.name_eng = createGetDataDto.name_eng || data.name_eng;
    data.images = createGetDataDto.images || data.images;
    data.price = createGetDataDto.price || data.price;
    data.discount = createGetDataDto.discount || data.discount;
    data.soldout = createGetDataDto.soldout || data.soldout;
    data.count = createGetDataDto.count || data.count;
    data.description = createGetDataDto.description || data.description;
    data.description_ru =
      createGetDataDto.description_ru || data.description_ru;
    data.description_eng =
      createGetDataDto.description_eng || data.description_eng;
    return data;
  }

  async delete(id: string): Promise<void> {
    const data = await this.findOne(id, this.lang);
    await data.destroy();
  }

  private langAttr(lang: langType) {
    switch (lang) {
      case 'ru':
        return [
          'id',
          'name_ru',
          'description_ru',
          'images',
          'price',
          'discount',
          'soldout',
          'count',
        ];
      case 'eng':
        return [
          'id',
          'name_eng',
          'description_eng',
          'images',
          'price',
          'discount',
          'soldout',
          'count',
        ];
      default:
        return [
          'id',
          'name',
          'description',
          'images',
          'price',
          'discount',
          'soldout',
          'count',
        ];
    }
  }
}
