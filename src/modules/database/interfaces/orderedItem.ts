import { IOrder } from './order';

export interface IOrderedItem {
  id?: number;
  orderId: number;
  itemId: number;
  amount: number;

  createdDate?: Date;
  updatedDate?: Date;

  orders?: IOrder;
}
