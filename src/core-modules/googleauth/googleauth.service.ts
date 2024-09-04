import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleauthService {
   
  constructor(
     private readonly userService:UsersService,
     private readonly jwtService: JwtService
  ){}

   async validateUser(createUserDto:CreateUserDto) {
       const {email} = createUserDto
        const existinguser = await this.userService.findOneEmail(email)
     
        if(existinguser.length < 1){
          const newuser =  await this.userService.create(createUserDto)

          const payload  = {
             username: newuser.username,
             sub: newuser.id,
             email: newuser.email
          }
         const jwtToken =  this.jwtService.sign(payload)
          return newuser
        }else{

          const payload  = {
            username: existinguser[0].username,
            sub: existinguser[0].id,
            email: existinguser[0].email
         }

         const jwtToken =  this.jwtService.sign(payload)
       
         return existinguser[0]
        }

   }

   async login(createUserDto:CreateUserDto){

      const existinguser = await this.userService.findOneEmail(createUserDto.email)
      const payload  = {
         username: existinguser[0].username,
         sub: existinguser[0].id,
         email: existinguser[0].email
      }

      const jwtToken =  this.jwtService.sign(payload)

      return { 
          access_token: jwtToken,
          user: existinguser[0]
      }
   }
}
