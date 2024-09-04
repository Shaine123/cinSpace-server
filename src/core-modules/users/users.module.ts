import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../all-entities';
import { SharedModule } from 'src/shared/shared.module';
import { HashService } from 'src/shared/hash/hash.service';

@Module({
  imports:[TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [UsersController],
  providers: [UsersService, HashService],
  exports:[UsersService]
})
export class UsersModule {}
