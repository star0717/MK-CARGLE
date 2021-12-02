import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import env_config from 'src/config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: env_config().mailerModule.transport.host,
        port: parseInt(env_config().mailerModule.transport.port),
        ignoreTLS: env_config().mailerModule.transport
          .ignoreTLS as unknown as boolean,
        secure: env_config().mailerModule.transport
          .secure as unknown as boolean,
        auth: {
          user: env_config().mailerModule.transport.auth.user,
          pass: env_config().mailerModule.transport.auth.pass,
        },
      },
      defaults: {
        from: env_config().mailerModule.defaults.from,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    PassportModule,
    JwtModule.register({
      secret: `${env_config().token.key}`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
