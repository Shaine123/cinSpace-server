import { Module } from '@nestjs/common';
import { GoogleauthService } from './googleauth.service';
import { GoogleauthController } from './googleauth.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/config/env';
import { SessionSerializer } from './serializer.service';


@Module({
  imports:[UsersModule,
    JwtModule.register({
      secret: ENV.JWT_SECRETE,
      signOptions: {expiresIn: '1h'}
    })
  ],
  providers: [GoogleauthService, GoogleStrategy, SessionSerializer],
  controllers: [GoogleauthController]
})
export class GoogleauthModule {}
