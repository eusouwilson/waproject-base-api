import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrderedItem } from '../interfaces/orderedItem';
import { Item } from './item';
import { Order } from './order';

export class OrderedItem extends Model implements IOrderedItem {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public amount: number;
  @ApiProperty({ type: 'integer' })
  public orderId: number;
  @ApiProperty({ type: 'integer' })
  public itemId: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  @ApiProperty({ nullable: true })
  public items?: Item[];
  public order?: Order[];

  public static get tableName(): string {
    return 'OrderedItem';
  }

  public static get relationMappings(): any {
    return {
      items: {
        relation: Model.HasOneRelation,
        modelClass: Item,
        filter: (query: any) => query.select('id', 'description', 'price'),
        join: {
          from: 'Item.id',
          to: 'OrderedItem.itemId'
        }
      },
      order: {
        relation: Model.HasOneRelation,
        modelClass: Order,
        filter: (query: any) => query.select('id', 'dateOrder', 'amount'),
        join: {
          from: 'Order.id',
          to: 'OrderedItem.orderId'
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
  public $formatJson(data: IOrderedItem): IOrderedItem {
    return data;
  }
}
