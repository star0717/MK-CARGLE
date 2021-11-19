import { Module } from '@nestjs/common';
import config from "src/config/configuration";
import { ConfigModule } from '@nestjs/config';
import { Auth2Service } from './auth2.service';
import { Auth2Controller } from './auth2.controller';
import { Users2Module } from 'src/modules/users2/users2.module';
import { Companies2Module } from 'src/modules/companies2/companies2.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    Users2Module,
    Companies2Module,
    PassportModule,
    JwtModule.register({
      secret: `${config().token.key}`,
      signOptions: { expiresIn: '1d' },
    }),
    HttpModule,
    CommonModule
  ],
  controllers: [Auth2Controller],
  providers: [Auth2Service]
})
export class Auth2Module { }
