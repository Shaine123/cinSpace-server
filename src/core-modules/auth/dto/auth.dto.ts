import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class AuthDto{
   
  @ApiProperty({
    description:'Enter your username',
    example: 'john'
  })
  @IsNotEmpty()
  @IsString()
  username: string

     
  @ApiProperty({
    description:'Enter your password',
    example: 'password'
  })
  @IsNotEmpty()
  @IsString()
  password: string
}