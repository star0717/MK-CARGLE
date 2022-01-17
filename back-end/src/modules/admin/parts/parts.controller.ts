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
import { UserAuthority } from 'src/constants/model.const';
import { AuthToken } from 'src/lib/decorators/decorators';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { Part } from 'src/models/part.entity';
import { PartsService } from './parts.service';

@Controller('admin/parts')
@ApiTags('시스템 관리자용 부품관리 API')
export class PartsController extends SafeControllerFactory<Part>(Part) {
  constructor(private readonly service: PartsService) {
    super(service);
  }

  @Post()
  @ApiOperation({ summary: `[ADMIN] 새로운 Part를 추가` })
  @ApiBody({ description: `추가할 Part`, type: Part })
  @ApiCreatedResponse({
    description: `추가된 Part`,
    type: Part,
  })
  async create(
    @Body() part: Part,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<Part> {
    return this.service.create(token, part);
  }

  @Get()
  @ApiOperation({
    summary: `[ADMIN] 조건에 해당하는 Part를 배열 데이터를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 Part를 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<FindResult<Part>> {
    return this.service.findByOptions(token, fParams);
  }

  @Get('class/:id')
  @ApiOperation({
    summary: `[ADMIN] 조건에 해당하는 특정 클래스의 Part를 배열 데이터를 페이징 정보와 함께 반환`,
  })
  @ApiParam({
    name: 'id',
    description: `조회할 부품의 클래스. A부터 O사이의 대문자 알파벳`,
  })
  @ApiResponse({
    description: `검색된 Part를 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findSpecificClassByOptions(
    @Param('id') id: string,
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<FindResult<Part>> {
    fParams.filter = { label: id } as Partial<Part>;
    return this.service.findByOptions(token, fParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: `[ADMIN] id에 해당하는 Part 데이터 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 Part의 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 Part 데이터`,
    type: Part,
  })
  async findById(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<Part> {
    return this.service.findById(token, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: `[ADMIN] id에 해당하는 Part 데이터 갱신`,
  })
  @ApiParam({ name: 'id', description: `해당 Part의 오브젝트 ID` })
  @ApiBody({ description: `갱신된 Part 데이터`, type: Part })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() doc: Part,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<Part> {
    console.log('update in BaseController');
    console.log(doc);
    return this.service.findByIdAndUpdate(token, id, doc);
  }

  @Delete(':id')
  @ApiOperation({
    summary: `[ADMIN] id에 해당하는 Part 데이터 삭제`,
  })
  @ApiParam({ name: 'id', description: `해당 Part의 오브젝트 ID` })
  @ApiResponse({
    description: `삭제된 Part 데이터의 수`,
    type: DeleteResult,
  })
  async findByIdAndRemove(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    return this.service.findByIdAndRemove(token, id);
  }
}
