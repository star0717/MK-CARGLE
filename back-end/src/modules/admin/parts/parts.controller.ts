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
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  DeleteObjectIds,
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { Part } from 'src/models/part.entity';
import { PartsService } from './parts.service';

@Controller('admin/parts')
@ApiTags('시스템 관리자용 부품관리 API')
export class PartsController {
  constructor(private readonly service: PartsService) {}

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
    console.log(part);
    if (part.tsCode) console.log('tsCode 있음');
    if (part.tsCode == '') {
      console.log('tsCode 빈값');
      delete part.tsCode;
      console.log(part);
    }
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
    return this.service.findAllPart();
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
    return this.service.findAllPart(id);
  }

  @Get('gen-code/:id')
  @ApiOperation({
    summary: '[ADMIN] 특정 클래스에 추가할 새로운 부품코드를 반환',
  })
  @ApiParam({
    name: 'id',
    description: `추가할 부품의 클래스. A부터 O사이의 대문자 알파벳`,
  })
  @ApiResponse({
    description: `부품코드`,
    type: String,
  })
  async genPartCode(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<string> {
    const result = await this.service.genPartCode(id);
    console.log(result);
    return result;
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
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
    @Body() objectIds: DeleteObjectIds,
  ): Promise<DeleteResult> {
    return this.service.deleteManyByIds(token, objectIds);
  }
}
