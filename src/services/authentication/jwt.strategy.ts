import { Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";
import { jwtConstants } from "../../static/private/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return { userId: payload.sub, username: payload.username }
  }
}
