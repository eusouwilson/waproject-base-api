export interface IOrder {
  id?: number;
  dateOrder: Date;
  client: string;

  createdDate?: Date;
  updatedDate?: Date;
}
