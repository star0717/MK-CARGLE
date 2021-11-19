import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Users2Service } from './users2.service';
import { Users2Controller } from './users2.controller';
import { User } from 'src/models/user.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
  ],
  controllers: [Users2Controller],
  providers: [Users2Service],
  exports: [Users2Service]
})
export class Users2Module { }
