import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { CompaniesModule } from 'src/modules/companies/companies.module';

@Module({
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
