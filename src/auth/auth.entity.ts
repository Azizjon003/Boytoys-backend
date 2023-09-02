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
export class Auth extends Model {
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
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthday: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  phoneVerifired: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['user', 'admin'],
    defaultValue: 'user',
  })
  role: string;
}
