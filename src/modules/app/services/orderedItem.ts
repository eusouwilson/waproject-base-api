import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrderedItem } from 'modules/database/interfaces/orderedItem';
import { OrderedItem } from 'modules/database/models/orderedItem';

import { OrderedItemRepository } from '../repositories/orderedItem';

@Injectable()
export class OrderedItemService {
  constructor(private orderedItemRepository: OrderedItemRepository) {}

  public async save(model: IOrderedItem): Promise<OrderedItem> {
    if (model.id) return this.update(model);
    return this.create(model);
  }
  private async create(model: IOrderedItem): Promise<OrderedItem> {
    const oderedItem = await this.orderedItemRepository.insert(model);
    return oderedItem;
  }

  private async update(model: IOrderedItem): Promise<OrderedItem> {
    const oderedItem = await this.orderedItemRepository.findById(model.id);
    if (!oderedItem) throw new NotFoundException('not-found');

    return this.orderedItemRepository.update({ ...oderedItem, ...model });
  }
}
