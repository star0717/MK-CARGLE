import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  Type,
  Injectable,
  ValidationPipe,
  ValidationPipeOptions,
  ArgumentMetadata,
  UsePipes,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BaseEntity,
  DeleteResult,
  PaginateOptions,
  PaginateResult,
} from '../../models/base.entity';
import { BaseService } from './base-crud.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Injectable()
export class AbstractValidationPipe extends ValidationPipe {
  constructor(
    options: ValidationPipeOptions,
    private readonly targetTypes: {
      body?: Type<any>;
      query?: Type<any>;
      param?: Type<any>;
      custom?: Type<any>;
    },
  ) {
    super(options);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const targetType = this.targetTypes[metadata.type];
    if (!targetType) {
      return super.transform(value, metadata);
    }
    return super.transform(value, { ...metadata, metatype: targetType });
  }
}

export interface IController<T> {
  create(doc: T): Promise<T>;
  findByOptions(qeury: PaginateOptions): Promise<PaginateResult<T>>;
  findById(id: string): Promise<T>;
  update(id: string, doc: T): Promise<T>;
  remove(id: string): Promise<DeleteResult>;
}

export function BaseControllerFactory<T extends BaseEntity = BaseEntity>(
  bodyDto: Type<T>,
): Type<IController<T>> {
  @Controller()
  // 가드 적용: 로그인 된 연결만을 허용
  // @UseGuards(JwtAuthGuard)
  // 파이프 적용: DTO 데이터 검증
  @UsePipes(
    new AbstractValidationPipe(
      {
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
      },
      { body: bodyDto },
    ),
  )
  class BaseController<T extends BaseEntity> implements IController<T> {
    constructor(private readonly baseService: BaseService<T>) {}

    @Post()
    @ApiOperation({ summary: `새로운 ${bodyDto.name} 데이터 추가` })
    @ApiBody({ description: `추가할 ${bodyDto.name} 데이터`, type: bodyDto })
    @ApiCreatedResponse({
      description: `추가된 ${bodyDto.name} 데이터`,
      type: bodyDto,
    })
    async create(@Body() doc: T): Promise<T> {
      return this.baseService.create(doc);
    }

    @Get()
    @ApiOperation({
      summary: `조건에 해당하는 ${bodyDto.name} 배열 데이터를 페이징 정보와 함께 반환`,
    })
    @ApiResponse({
      description: `검색된 ${bodyDto.name} 배열 데이터와 페이징 정보`,
      type: PaginateResult,
    })
    async findByOptions(
      @Query() findQuery: PaginateOptions,
    ): Promise<PaginateResult<T>> {
      return this.baseService.findByOptions(findQuery);
    }

    @Get(':id')
    @ApiOperation({ summary: `id에 해당하는 ${bodyDto.name} 데이터 반환` })
    @ApiParam({ name: 'id', description: `해당 ${bodyDto.name}의 오브젝트 ID` })
    @ApiResponse({
      description: `검색된 ${bodyDto.name} 데이터`,
      type: bodyDto,
    })
    async findById(@Param('id') id: string): Promise<T> {
      return this.baseService.findById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: `id에 해당하는 ${bodyDto.name} 데이터 갱신` })
    @ApiParam({ name: 'id', description: `해당 ${bodyDto.name}의 오브젝트 ID` })
    @ApiBody({ description: `갱신된 ${bodyDto.name} 데이터`, type: bodyDto })
    async update(@Param('id') id: string, @Body() doc: Partial<T>): Promise<T> {
      console.log('update in BaseController');
      console.log(doc);
      return this.baseService.update(id, doc);
    }

    @Delete(':id')
    @ApiOperation({ summary: `id에 해당하는 ${bodyDto.name} 데이터 삭제` })
    @ApiParam({ name: 'id', description: `해당 ${bodyDto.name}의 오브젝트 ID` })
    @ApiResponse({
      description: `삭제된 ${bodyDto.name} 데이터의 수`,
      type: DeleteResult,
    })
    async remove(@Param('id') id: string): Promise<DeleteResult> {
      return this.baseService.remove(id);
    }
  }
  return BaseController;
}
