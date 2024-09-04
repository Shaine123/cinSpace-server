import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
   async canActivate(context: ExecutionContext){
     const activate = (await super.canActivate(context)) as boolean
     const request = context.switchToHttp().getRequest() 
     if (activate) {
      console.log('User before login:', request.user);
      await super.logIn(request);
      console.log('User after login:', request.user);
    } else {
      console.log('Activation failed, not logged in');
    }
     return activate
   }
}