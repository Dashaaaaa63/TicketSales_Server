import { HydratedDocument } from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IUser } from "../interfaces/IUser";
import { Roles } from "../types/Roles";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser{
  @Prop() id: string;
  @Prop() login: string;
  @Prop() password: string;
  @Prop() email: string;
  @Prop() cardNumber: string;
  @Prop() role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);