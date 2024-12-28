import { IOrderPerson } from "./IOrderPerson";

export interface IOrder {
  tourId: string;
  userId: string;
  orderPerson: IOrderPerson;
  _id?: string;
}