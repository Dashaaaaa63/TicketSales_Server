
import * as mongoose from "mongoose";
import { Roles } from "../types/Roles";



export interface IUser {
  login: string;
  password: string;
  email?: string;
  cardNumber?: string;
  role?: Roles,
  _id?: mongoose.Types.ObjectId
}

