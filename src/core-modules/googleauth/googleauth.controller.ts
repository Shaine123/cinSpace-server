import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleauthService } from './googleauth.service';

@Controller('google')
export class GoogleauthController {
   constructor(
      private readonly googleAuthService:GoogleauthService
   ){}

   @UseGuards(GoogleAuthGuard)
  @Get('ouath/login')
   handleLogin() {
      return { msg: 'Google Login'}
   }


   @UseGuards(GoogleAuthGuard)
   @Get('ouath/redirect')
   async handleRedirect(@Request() req, @Res() res){
      const user = await this.googleAuthService.login(req.user)

      res.redirect(`http://localhost:5173/cinspace/storage?data=${JSON.stringify(user)}`);
   }
}
