import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthToken } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Estimate } from 'src/models/estimate.entity';
import { EstimatesService } from './estimates.service';

@Controller('estimates')
@ApiTags('견적서 API')
export class EstimatesController {
  constructor(private readonly service: EstimatesService) {}

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 Estimate 데이터 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 Estimate 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 Estimate 데이터`,
    type: Estimate,
  })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Estimate> {
    return await this.service.findById(token, id);
  }
}
