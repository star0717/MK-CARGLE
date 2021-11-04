import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import configuration from "src/config/configuration"
import { ConfigModule } from '@nestjs/config';
import { CompaniesModule } from 'src/modules/companies/companies.module';


@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    CompaniesModule,
    PassportModule,
    JwtModule.register({
      secret: `${configuration().token.key}`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
