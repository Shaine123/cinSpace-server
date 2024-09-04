import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../all-entities';
import { HashService } from 'src/shared/hash/hash.service';
import { SharedModule } from 'src/shared/shared.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './jwt/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/config/env';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]), 
   SharedModule, 
   PassportModule,
   JwtModule.register({
     secret: ENV.JWT_SECRETE,
     signOptions: {expiresIn: '1h'}
   })
  ],
  controllers: [AuthController],
  providers: [AuthService, HashService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
