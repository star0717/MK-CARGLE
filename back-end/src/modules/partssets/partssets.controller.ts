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
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  DeleteObjectIds,
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { PartsSet } from 'src/models/partsset.entity';
import { PartssetsService } from './partssets.service';

@Controller('partssets')
@ApiTags('세트 부품 관리 API')
export class PartssetsController {
  constructor(private readonly service: PartssetsService) {}

  @Post()
  @ApiOperation({ summary: `[WORKER] 새로운 PartsSet 데이터 추가` })
  @ApiBody({ description: `추가할 PartsSet 데이터`, type: PartsSet })
  @ApiCreatedResponse({
    description: `추가된 PartsSet 데이터`,
    type: PartsSet,
  })
  async create(
    @Body() doc: PartsSet,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<PartsSet> {
    return await this.service.create(token, doc);
  }

  @Get()
  @ApiOperation({
    summary: `[WORKER] 조건에 해당하는 PartsSet 배열 데이터를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 PartsSet 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<FindResult<PartsSet>> {
    return await this.service.findByOptions(token, fParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 PartsSet 데이터 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 PartsSet의 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 PartsSet 데이터`,
    type: PartsSet,
  })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<PartsSet> {
    return await this.service.findById(token, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 PartsSet 데이터 갱신`,
  })
  @ApiParam({ name: 'id', description: `해당 PartsSet의 오브젝트 ID` })
  @ApiBody({ description: `갱신된 PartsSet 데이터`, type: PartsSet })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() doc: PartsSet,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<PartsSet> {
    console.log('update in BaseController');
    console.log(doc);
    return await this.service.findByIdAndUpdate(token, id, doc);
  }

  @Delete(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 PartsSet 데이터 삭제`,
  })
  @ApiParam({ name: 'id', description: `해당 PartsSet의 오브젝트 ID` })
  @ApiResponse({
    description: `삭제된 PartsSet 데이터의 수`,
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
    summary: `[ADMIN] 복수 오브젝트 ID에 해당하는 PartsSet 데이터들을 삭제`,
  })
  @ApiBody({
    description: `삭제할 데이터들의 오브젝트ID들`,
    type: DeleteObjectIds,
  })
  @ApiResponse({
    description: `삭제된 PartsSet 데이터의 수`,
    type: DeleteResult,
  })
  async deleteManyByIds(
    @AuthToken() token: AuthTokenInfo,
    @Body() objectIds: DeleteObjectIds,
  ): Promise<DeleteResult> {
    return this.service.deleteManyByIds(token, objectIds);
  }
}
