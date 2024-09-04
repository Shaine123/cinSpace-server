import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/core-modules/all-entities";
import { LOCAL_STRATEGY_NAME } from "../guards/local-auth.guard";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,LOCAL_STRATEGY_NAME){
    constructor(private readonly authService:AuthService){
       super()
    }

    async validate(username:string, password:string):Promise<User>{
       return await this.authService.validateUser(username,password)
    }
}