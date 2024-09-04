import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../all-entities';
import { Repository } from 'typeorm';
import { HashService } from 'src/shared/hash/hash.service';
import { JwtService } from '@nestjs/jwt';
import * as speakeasy from 'speakeasy';
import { googleAuthGenType } from './types/google-autthgen.type';
import { googleAuthVerifyType } from './types/google-authverify.type';

@Injectable()
export class AuthService {

  constructor(
     @InjectRepository(User)
     private readonly userReposiytory:Repository<User>,
     private readonly hashService: HashService,
     private readonly jwtService: JwtService
  ){}
  
  signUp(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  
 async validateUser(username:string,password:string):Promise<User>{
     const user = await this.userReposiytory.findBy({username})

     if(!user[0]){
       throw new UnauthorizedException({
          error: 'User does not exist'
       })
     }
    
    const passwordMatches = await this.hashService.check(password,user[0].password)

    if(!passwordMatches){
      throw new UnauthorizedException({
        error: 'Password does not match'
     })
    }


  return user[0]
}

async login(user:User){
  const payload = {
     username: user.username,
     sub: user.id,
     email: user.email
  }

  const access_token = this.jwtService.sign(payload)

    return {
       message: 'Login Successful',
       access_token: access_token,
       user: user
    }
}

async genGoogleAuthSecrete(userEmail:googleAuthGenType):Promise<string>{
  const secret = speakeasy.generateSecret({ name: userEmail  });
  // Display this secret to the user securely
  return secret.base32;
}

verifyeGoogleToken(googleAuthVerify:googleAuthVerifyType){
    return speakeasy.totp.verify({
      secret: googleAuthVerify.secret,
      encoding: 'base32',
      token: googleAuthVerify.token,
    })
}

}
