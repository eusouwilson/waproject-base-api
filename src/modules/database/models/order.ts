import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/Order';
import { OrderedItem } from './orderedItem';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public dateOrder: Date;
  @ApiProperty({ type: 'string' })
  public client: string;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Order';
  }

  public static get relationMappings(): any {
    return {
      Orders: {
        relation: Model.HasManyRelation,
        modelClass: OrderedItem,
        join: {
          from: 'Order.id',
          to: 'oderedItem.orderId'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
  public $formatJson(data: IOrder): IOrder {
    return data;
  }
}
