import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { AuthModule } from './lib/auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    // TypegooseModule.forRoot("mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME),
    TypegooseModule.forRoot('mongodb://test:test1234@54.178.58.215:9003/admin'),
    ModulesModule,
    AuthModule,
  ],
})
export class AppModule {}
