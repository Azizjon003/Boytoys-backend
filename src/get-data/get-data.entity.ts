import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class getData extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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
    type: DataType.ARRAY(DataType.STRING),
  })
  images: string[];

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  price: bigint;

  @Column({
    type: DataType.INTEGER,
  })
  discount: number;

  @Column({
    type: DataType.INTEGER,
  })
  soldout: number;

  @Column({
    type: DataType.INTEGER,
  })
  count: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description_ru: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description_eng: string;
}
