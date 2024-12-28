import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {

  constructor(private userService: UsersService) {
    super({usernameField: 'login', passwordField: 'password'});
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.userService.checkAuthUser(login, password);
    console.log('user', user);
    if (user.length === 0) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        errorText: 'Пользователь не найден в БД'
      }, HttpStatus.CONFLICT);
    }
    return true;
  }
}
