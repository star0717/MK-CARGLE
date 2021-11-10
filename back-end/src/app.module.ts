import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { AuthModule } from './lib/auth/auth.module';
import { CommonModule } from './lib/common/common.module';
import configuration from './config/configuration';

const dbInfo = (process.env.DB_USE_AUTH)
  ? 'mongodb://' + process.env.DB_ID + ":" + process.env.DB_PWD + "@"
  + process.env.DB_HOST + ":" + process.env.DB_PORT + '/' + process.env.DB_NAME
  : 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME;
console.log(dbInfo);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    // TypegooseModule.forRoot('mongodb://mk:mk1234@3.36.252.198:9003/admin'),
    // TypegooseModule.forRoot(
    //   'mongodb://' + process.env.DB_ID + ":" + process.env.DB_PWD + "@"
    //   + process.env.DB_HOST + '/' + process.env.DB_NAME
    // ),
    TypegooseModule.forRoot(dbInfo),
    ModulesModule,
    AuthModule,
    CommonModule,
  ],
})
export class AppModule {}
