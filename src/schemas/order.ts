import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ITour } from "../interfaces/ITour";
import { IOrder } from "../interfaces/IOrder";
import { IOrderPerson } from "../interfaces/IOrderPerson";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order implements IOrder {
    @Prop() tourId: string;
    @Prop() userId: string;
    @Prop({type:  Object }) orderPerson: IOrderPerson;
}

export const OrderSchema = SchemaFactory.createForClass(Order)