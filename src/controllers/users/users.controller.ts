import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from "../../services/users/users.service";
import { User } from "../../schemas/user";
import { UserDto } from "../../dto/UserDto";
import { AuthGuard } from "@nestjs/passport";
import { UserAuthPipe } from "../../pipes/user-auth.pipe";
import { IUser } from "../../interfaces/IUser";

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(":id")
  getUserById(@Param('id') id): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  registerUser(@Body(UserAuthPipe) data: UserDto): Promise<boolean> {
    return this.usersService.checkRegUser(data.login).then((queryRes) => {
      console.log('data reg', queryRes);
      if (queryRes.length === 0) {
        return this.usersService.registerUser(data);
      } else {
        console.log('err - user is exists');
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          errorText: 'Пользователь уже зарегистрирован',
        }, HttpStatus.CONFLICT);
      }
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post(":login")
  authUser(@Body(UserAuthPipe) data: UserDto, @Param('login') login: string): Promise<{ access_token: string }> {
    return this.usersService.login(data);
  }

  @Put(":id")
  updateUsers(@Param('id') id: string, @Body() body: IUser): Promise<IUser> {
    return this.usersService.updateUsers(id, body);
  }

  @Delete()
  async deleteUsers(): Promise<string> {
    await this.usersService.deleteUsers();
    return 'Коллекция очищена';
  }

  @Delete(":id")
  deleteUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserById(id);
  }
}
