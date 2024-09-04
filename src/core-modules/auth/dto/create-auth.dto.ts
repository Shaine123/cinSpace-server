import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateAuthDto {

  @ApiProperty({
     description:'Username of the account holder',
     example:'john'
  })
  @IsString()
  @IsNotEmpty()
  uname:string 

  @ApiProperty({
    description:'Email the account holder',
    example:'john@gmail.com'
 })
  @IsString()
  @IsNotEmpty()
  email:string 

  @ApiProperty({
    description:'Phonenumber of the account holder',
    example:'09557892848'
 })
  @IsNumber()
  phonenumber: string

  @ApiProperty({
    description:'Password of the account holder',
    example:'password'
 })
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @ApiProperty({
    description:'CPassword of the account holder',
    example:'password'
 })
  @IsNotEmpty()
  @MinLength(6)
  cpassword: string
}
