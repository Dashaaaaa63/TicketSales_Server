import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from "../../services/orders/orders.service";
import { OrderDto } from "../../dto/OrderDto";
import { ValidationParamIdPipe } from "../../pipes/param-id.pipe";
import { IOrder } from "../../interfaces/IOrder";

@Controller('orders')
export class OrdersController {

  constructor(private ordersService: OrdersService) {
  }

  @Post()
  initTours(@Body() data: OrderDto): void {
    //const orderData = new OrderDto(data.age, data.birthDay, data.cardNumber, data.tourId, data.userId);
    this.ordersService.sendOrder(data);
  }

  @Get(':userId')
  getOrdersByUserId(@Param('userId', ValidationParamIdPipe) userId: string): Promise<IOrder[]> {
    return this.ordersService.getOrdersByUserId(userId);
  }
}
