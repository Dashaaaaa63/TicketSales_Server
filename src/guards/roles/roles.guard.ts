import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IUser } from "../../interfaces/IUser";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../../static/private/constants";
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('context', context.getHandler());
    const token = this.extractTokenFromHeader(request);
    const userPayLoad = <IUser>await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
    console.log('token', token);
    console.log('user from jwt', userPayLoad);
    return userPayLoad?.role === "admin";
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
