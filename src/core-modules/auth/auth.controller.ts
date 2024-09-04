import { Controller,  Post, Body, Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../all-entities';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthDto } from './dto/auth.dto';
import { googleAuthGenType } from './types/google-autthgen.type';
import { googleAuthVerifyType } from './types/google-authverify.type';
import { AuthenticatedUser } from './decorator/authenticated-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Signup a new user'
  })
  @ApiResponse({
     status: 200,
     description: 'Registration Successful',
     type: User
  })
  @Post('signup')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @ApiOperation({
    description:'This API facilates user login via username'
  })
  @ApiResponse({
     status:200,
     description: 'Login Successful',
     type: User
  })

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(
    @Body() authDto:AuthDto,
    @AuthenticatedUser() user: User){
     return await this.authService.login(user)
  }

  
  @ApiOperation({
    description: 'This Api Generates Google Authenticator token'
  })
  @Post('genAuthSecrete')
  async genGoogleAuthSecrete(@Body() userEmail:googleAuthGenType){ 
     return this.authService.genGoogleAuthSecrete(userEmail)
  }


  @Post('verifyeGoogleToken')
   verifyeGoogleToken(@Body() googleAuthVarify:googleAuthVerifyType){
       return this.authService.verifyeGoogleToken(googleAuthVarify)
   }

}
