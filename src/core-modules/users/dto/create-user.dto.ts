import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  
  @ApiProperty({
     description:'username',
     example: 'john'
  })
  username: string
 
  @ApiProperty({
    description:'email of the user',
    example: 'john@gmail.com'
 })
  email: string

  @ApiProperty({
    description:'phonenumber of the user',
    example: '09557892848'
 })
  phonenumber:string

  @ApiProperty({
    description:'password of the user',
    example: 'password'
 })
  password: string

  @ApiProperty({
    description:'password of the user',
    example: 'password'
 })
  cpassword: string
}
