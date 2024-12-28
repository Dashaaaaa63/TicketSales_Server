import * as mongoose from "mongoose";
import { Roles } from "../types/Roles";

export interface IResponseUser {
  id: mongoose.Types.ObjectId;
  access_token: string;
  role: Roles;
}