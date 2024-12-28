import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "../../schemas/order";
import { OrdersService } from "../../services/orders/orders.service";

@Module({
  imports: [MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
