import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthToken } from 'src/lib/decorators/decorators';
import { Agency } from 'src/models/agency.entity';
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  DeleteObjectIds,
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { AgenciesService } from './agencies.service';

@Controller('agencies')
@ApiTags('거래처 관리 API')
export class AgenciesController {
  constructor(private readonly service: AgenciesService) {}

  @Post()
  @ApiOperation({ summary: `[WORKER] 새로운 Agency 데이터 추가` })
  @ApiBody({ description: `추가할 Agency 데이터`, type: Agency })
  @ApiCreatedResponse({
    description: `추가된 Agency 데이터`,
    type: Agency,
  })
  async create(
    @Body() doc: Agency,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Agency> {
    return await this.service.create(token, doc);
  }

  @Get()
  @ApiOperation({
    summary: `[WORKER] 조건에 해당하는 Agency 배열 데이터를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 Agency 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<FindResult<Agency>> {
    return await this.service.findByOptions(token, fParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 Agency 데이터 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 Agency의 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 Agency 데이터`,
    type: Agency,
  })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Agency> {
    return await this.service.findById(token, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 Agency 데이터 갱신`,
  })
  @ApiParam({ name: 'id', description: `해당 Agency의 오브젝트 ID` })
  @ApiBody({ description: `갱신된 Agency 데이터`, type: Agency })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() doc: Agency,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Agency> {
    console.log('update in BaseController');
    console.log(doc);
    return await this.service.findByIdAndUpdate(token, id, doc);
  }

  @Delete(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 Agency 데이터 삭제`,
  })
  @ApiParam({ name: 'id', description: `해당 Agency의 오브젝트 ID` })
  @ApiResponse({
    description: `삭제된 Agency 데이터의 수`,
    type: DeleteResult,
  })
  async findByIdAndRemove(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    return await this.service.findByIdAndRemove(token, id);
  }

  @Post('/deletemany')
  @ApiOperation({
    summary: `[ADMIN] 복수 오브젝트 ID에 해당하는 Part 데이터들을 삭제`,
  })
  @ApiBody({
    description: `삭제할 데이터들의 오브젝트ID들`,
    type: DeleteObjectIds,
  })
  @ApiResponse({
    description: `삭제된 Part 데이터의 수`,
    type: DeleteResult,
  })
  async deleteManyByIds(
    @AuthToken() token: AuthTokenInfo,
    @Body() objectIds: DeleteObjectIds,
  ): Promise<DeleteResult> {
    return this.service.deleteManyByIds(token, objectIds);
  }
}
