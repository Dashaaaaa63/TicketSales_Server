import { IUser } from "../interfaces/IUser";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto implements IUser {
  @IsNotEmpty() login: string;
  @IsNotEmpty() password: string;
  @IsOptional() cardNumber: string;

  @IsOptional()
  @IsEmail()
  email: string;
}