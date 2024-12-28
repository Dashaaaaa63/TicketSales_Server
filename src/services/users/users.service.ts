import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../../schemas/user";
import { UserDto } from "../../dto/UserDto";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "../../interfaces/IUser";
import * as bcrypt from 'bcrypt';
import { IResponseUser } from "../../interfaces/IResponseUser";

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
    console.log('userService run');
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async registerUser(data: UserDto): Promise<boolean> {
    const defaultRole = 'user';
    const salt = await bcrypt.genSalt(10);
    console.log('salt', salt);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    console.log('hashedPassword', hashedPassword);
    const newUser: IUser = {...data, password: hashedPassword, role: defaultRole};
    const userData = new this.userModel(newUser);
    userData.save();
    return Promise.resolve(true);
  }

  async updateUsers(id: string, data: IUser): Promise<IUser> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const hashUser = Object.assign({}, data, {password: hashedPassword});
    return this.userModel.findByIdAndUpdate(id, hashUser);
  }

  async deleteUsers(): Promise<void> {
    await this.userModel.deleteMany({});
    console.log('Коллекция users очищена');
  }

  async deleteUserById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async checkAuthUser(login: string, password: string): Promise<IUser[]> {
    const usersArr = await this.userModel.find<IUser>({login: login});
    if (usersArr.length === 0) {
      throw new BadRequestException('Логин указан неверно'); // Лучше использовать общий текст ошибки
    }
    const isMatch: boolean = bcrypt.compareSync(password, usersArr[0].password);
    if (!isMatch) {
      throw new BadRequestException('Пароль указан неверно');
    }
    return Promise.resolve(usersArr);
  }

  async checkRegUser(login: string): Promise<IUser[]> {
    return this.userModel.find({login: login});
  }

  async login(user: UserDto): Promise<IResponseUser> {
    const userFromDb = <IUser>await this.userModel.findOne({login: user.login});
    console.log('userFromDb', userFromDb);
    const payload = {login: user.login, password: user.password, role: userFromDb?.role};
    return {
      id: userFromDb._id,
      access_token: this.jwtService.sign(payload),
      role: userFromDb.role
    } as IResponseUser;
  }
}
