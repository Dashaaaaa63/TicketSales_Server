import { IOrder } from "../interfaces/IOrder";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderPersonDto } from "./OrderPersonDto";

export class OrderDto implements IOrder {

  @IsNotEmpty() tourId: string;
  @IsNotEmpty() userId: string;
  @ValidateNested()
  @Type(() => OrderPersonDto)
  orderPerson: OrderPersonDto;

  // constructor(age: string, birthDay: string, cardNumber: string, tourId: string, userId: string) {
  //   this.age = age;
  //   this.birthDay = birthDay;
  //   this.cardNumber = cardNumber;
  //   this.tourId = tourId;
  //   this.userId = userId;
  // }
}