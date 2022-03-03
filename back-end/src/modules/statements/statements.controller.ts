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
import { Statement } from 'src/models/statement.entity';
import { StatementsService } from './statements.service';

@Controller('statements')
@ApiTags('명세서 API')
export class StatementsController {
  constructor(private readonly service: StatementsService) {}

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 Statement 데이터 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 Statement 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 Statement 데이터`,
    type: Statement,
  })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Statement> {
    return await this.service.findById(token, id);
  }
}
