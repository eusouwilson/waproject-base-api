import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IItem } from 'modules/database/interfaces/Item';
import { Item } from 'modules/database/models/item';
import { Page, Transaction } from 'objection';

@Injectable()
export class ItemRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Item>> {
    let query = Item.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await Item.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async findById(id: number, transaction?: Transaction): Promise<Item> {
    return Item.query(transaction)
      .where({ id })
      .first();
  }

  public async findByDescription(description: string, transaction?: Transaction): Promise<Item> {
    return Item.query(transaction)
      .where({ description })
      .first();
  }

  public async insert(model: IItem, transaction?: Transaction): Promise<Item> {
    return Item.query(transaction).insert(model);
  }

  public async update(model: IItem, transaction?: Transaction): Promise<Item> {
    return Item.query(transaction).updateAndFetchById(model.id, <Item>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Item.query(transaction)
      .del()
      .where({ id });
  }
}
