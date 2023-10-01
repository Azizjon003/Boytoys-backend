import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Slider extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name_ru: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name_eng: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_ru: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_eng: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description_eng: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description_ru: string;
}
