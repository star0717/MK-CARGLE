import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose"
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/models/user.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] //AuthModule에서 사용가능하도록 노출
})
export class UsersModule { }
