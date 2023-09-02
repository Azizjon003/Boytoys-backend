import { Column, DataType, Model } from 'sequelize-typescript';

export class Orders extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  })
  products: any[];

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.JSONB,
  })
  address: any;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  paymentId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  deliveryId: string;

  @Column({
    type: DataType.TEXT,
  })
  message: string;

  @Column({
    type: DataType.ENUM,
    values: ['pending', 'success', 'cancel'],
    defaultValue: 'pending',
  })
  status: string;
}
