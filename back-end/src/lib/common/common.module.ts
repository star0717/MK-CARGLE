import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import configuration from "src/config/configuration"



@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: configuration().mailerModule.transport.host,
        port: parseInt(configuration().mailerModule.transport.port),
        ignoreTLS: configuration().mailerModule.transport.ignoreTLS as unknown as boolean,
        secure: configuration().mailerModule.transport.secure as unknown as boolean,
        auth: {
          user: configuration().mailerModule.transport.auth.user,
          pass: configuration().mailerModule.transport.auth.pass,
        },
      },
      defaults: {
        from: configuration().mailerModule.defaults.from
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    })
  ],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService]
})
export class CommonModule { }
