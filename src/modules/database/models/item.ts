import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IItem } from '../interfaces/item';
import { OrderedItem } from './orderedItem';

export class Item extends Model implements IItem {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'string' })
  public price: string;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Item';
  }

  public static get relationMappings(): any {
    return {
      Orders: {
        relation: Model.HasManyRelation,
        modelClass: OrderedItem,
        join: {
          from: 'Item.id',
          to: 'oderedItem.itemId'
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
  public $formatJson(data: IItem): IItem {
    return data;
  }
}
