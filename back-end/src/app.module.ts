import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { CommonModule } from './lib/common/common.module';
import config, { isUseAuthDB } from './config/configuration';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdminModule } from './lib/admin/admin.module';
import { AuthModule } from './lib/auth/auth.module';
import { SafeCrudModule } from './lib/safe-crud/safe-crud.module';
import { FcmModule } from './lib/fcm/fcm.module';

const dbInfo = isUseAuthDB()
  ? 'mongodb://' +
    process.env.DB_ID +
    ':' +
    process.env.DB_PWD +
    '@' +
    process.env.DB_HOST +
    ':' +
    process.env.DB_PORT +
    '/' +
    process.env.DB_NAME
  : 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME;
console.log(dbInfo);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    TypegooseModule.forRoot(dbInfo),
    AuthModule,
    CommonModule,
    AdminModule,
    SafeCrudModule,
    ModulesModule,
    FcmModule,
  ],
})
export class AppModule {}
