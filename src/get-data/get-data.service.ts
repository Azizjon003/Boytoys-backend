import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { getData } from './get-data.entity';
import { Slider } from 'src/slider/slider.entity';
import { getDataInterface } from './dto/getData.interface';
import { CreateGetDataDto } from './dto/createData.dto';
import { Not } from 'sequelize-typescript';
// import { GetDataProvider } from './get-data.providers';

@Injectable()
export class GetDataService {
  // constructor(private getDataRepository: GetDataProvider) {}
  async findAll(): Promise<getDataInterface> {
    // const data = await getData.findAll();
    // const slider = await Slider.findAll();
    const [data, slider] = await Promise.all([
      getData.findAll(),
      Slider.findAll(),
    ]);

    return {
      data,
      slider,
    };
  }

  async findOne(id: string): Promise<getData> {
    const data = await getData.findOne({
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
    const data = await this.findOne(id);
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
    const data = await this.findOne(id);
    await data.destroy();
  }
}
