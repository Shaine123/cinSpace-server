import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from 'src/config/env';
import { AuthModule } from './core-modules/auth/auth.module';
import { UsersModule } from './core-modules/users/users.module';
import { HashService } from './shared/hash/hash.service';
import { SharedModule } from './shared/shared.module';
import { AwsModule } from './core-modules/aws/aws.module';
import { GoogleauthModule } from './core-modules/googleauth/googleauth.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [TypeOrmModule.forRoot(ENV.DB_CONFIGURATION), AuthModule, UsersModule, SharedModule, AwsModule, GoogleauthModule, PassportModule.register({session: true})],
  controllers: [AppController],
  providers: [AppService, HashService],
})
export class AppModule {}
