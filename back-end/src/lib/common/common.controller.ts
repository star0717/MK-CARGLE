import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { randomInt } from 'crypto';
import { CommonService } from './common.service';

@ApiTags("공통 기능 API")
@Controller('com-service')
export class CommonController {
  constructor(
    private readonly comServiceService: CommonService,
    private readonly mailerService: MailerService,
  ) { }
}
