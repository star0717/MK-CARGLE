import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';

@ApiTags('공통 기능 API')
@Controller('com-service')
export class CommonController {
  constructor(private readonly comServiceService: CommonService) {}
}
