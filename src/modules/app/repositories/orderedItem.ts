import { Injectable } from '@nestjs/common';
import { IOrderedItem } from 'modules/database/interfaces/orderedItem';
import { OrderedItem } from 'modules/database/models/orderedItem';
import { Transaction } from 'objection';

@Injectable()
export class OrderedItemRepository {
  public async findById(orderId: number, transaction?: Transaction): Promise<OrderedItem[]> {
    return OrderedItem.query(transaction)
      .withGraphFetched('items')
      .where({ orderId });
  }
  public async insert(model: IOrderedItem, transaction?: Transaction): Promise<OrderedItem> {
    return OrderedItem.query(transaction).insert(model);
  }

  public async update(model: IOrderedItem, transaction?: Transaction): Promise<OrderedItem> {
    return OrderedItem.query(transaction).updateAndFetchById(model.id, <OrderedItem>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await OrderedItem.query(transaction)
      .del()
      .where({ id });
  }
}
