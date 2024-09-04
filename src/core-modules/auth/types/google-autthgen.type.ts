import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class googleAuthGenType {
  @ApiProperty({
     description: 'Email of the user',
     example: 'shaineberdida@gmail.com'
  })
  @IsEmail()
   email:string
}
