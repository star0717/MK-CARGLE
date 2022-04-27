import { Module } from '@nestjs/common';
import config from 'src/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from '../common/common.module';
import { UsersModule } from 'src/modules/users/users.module';
import { CompaniesModule } from 'src/modules/companies/companies.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SetbookingModule } from 'src/modules/setbooking/setbooking.module';
import { TimetableModule } from 'src/modules/timetable/timetable.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    UsersModule,
    CompaniesModule,
    PassportModule,
    JwtModule.register({
      secret: `${config().token.key}`,
      signOptions: { expiresIn: '1d' },
    }),
    HttpModule,
    CommonModule,
    SetbookingModule,
    TimetableModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
