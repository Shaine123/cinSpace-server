import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20"
import { ENV } from "src/config/env"
import { GoogleauthService } from "../googleauth.service"


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly googleAuthService:GoogleauthService
  ){
     super({
        clientID: ENV.CLIENT_ID,
        clientSecret: ENV.CLIENT_SECRETE,
        callbackURL: ENV.CALLBACK_URL,
        scope: ['profile','email']
     })
  }

  async validate(accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback) {
      const payload = 
      {
         username: profile.name.givenName,      
         email: profile.emails[0].value,
         phonenumber:'',
         password: '',
         cpassword: '',
      }
      const user = await this.googleAuthService.validateUser(payload)
      
      // console.log(user[0])
      done(null, user);
  }
}