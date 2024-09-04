import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class googleAuthVerifyType {
  @ApiProperty({
     description: 'Email of the user',
  })
  @IsEmail()
   secret:string

  @ApiProperty({
    description: 'Email of the user',
 })
 @IsEmail()
  token:string
}
