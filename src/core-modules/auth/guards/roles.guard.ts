import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorator/roles.decorator";


@Injectable()

export class RoleGuard implements CanActivate{
   constructor(private readonly reflector:Reflector){}

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const roles = this.reflector.get(ROLES_KEY, context.getHandler())

      const {user} = context.switchToHttp().getRequest()

      if(roles !== user){
         throw new UnauthorizedException(
           "You don't have the permission to access this feature"
         )
      }
      return true
   }
}