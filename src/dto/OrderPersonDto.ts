import { IOrderPerson } from "../interfaces/IOrderPerson";
import { IsDateString, IsInt, IsNotEmpty, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class OrderPersonDto implements IOrderPerson {
  @IsInt()
  @Min(18)
  @Max(100)
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[^\d]*$/)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[^\d]*$/)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\d]*$/)
  citizenship: number;

  @IsNotEmpty()
  @Matches(/^\d{12,14}$/)
  cardNumber: string;
}