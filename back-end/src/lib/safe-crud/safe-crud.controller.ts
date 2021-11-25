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
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
  BaseEntity,
  DeleteResult,
  FindParameters,
  FindResult,
} from '../../models/base.entity';
import { SafeService } from './safe-crud.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { AuthToken } from '../decorators/decorators';
import { UserAuthority } from 'src/models/user.entity';

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
  create(doc: T, token: AuthTokenInfo): Promise<T>;
  findByOptions(
    qeury: FindParameters,
    token: AuthTokenInfo,
  ): Promise<FindResult<T>>;
  findById(id: string, token: AuthTokenInfo): Promise<T>;
  findByIdAndUpdate(id: string, doc: T, token: AuthTokenInfo): Promise<T>;
  findByIdAndRemove(id: string, token: AuthTokenInfo): Promise<DeleteResult>;
}

export function SafeControllerFactory<T extends BaseEntity = BaseEntity>(
  bodyDto: Type<T>,
): Type<IController<T>> {
  @Controller()
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
  class SafeController<T extends BaseEntity> implements IController<T> {
    constructor(private readonly safeService: SafeService<T>) {}

    @Post()
    @ApiOperation({ summary: `새로운 ${bodyDto.name} 데이터 추가` })
    @ApiBody({ description: `추가할 ${bodyDto.name} 데이터`, type: bodyDto })
    @ApiCreatedResponse({
      description: `추가된 ${bodyDto.name} 데이터`,
      type: bodyDto,
    })
    async create(
      @Body() doc: T,
      @AuthToken() token: AuthTokenInfo,
    ): Promise<T> {
      return this.safeService.create(token, doc);
    }

    @Get()
    @ApiOperation({
      summary: `조건에 해당하는 ${bodyDto.name} 배열 데이터를 페이징 정보와 함께 반환`,
    })
    @ApiResponse({
      description: `검색된 ${bodyDto.name} 배열 데이터와 페이징 정보`,
      type: FindResult,
    })
    async findByOptions(
      @Query() fParams: FindParameters,
      @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
    ): Promise<FindResult<T>> {
      return this.safeService.findByOptions(token, fParams);
    }

    @Get(':id')
    @ApiOperation({ summary: `id에 해당하는 ${bodyDto.name} 데이터 반환` })
    @ApiParam({ name: 'id', description: `해당 ${bodyDto.name}의 오브젝트 ID` })
    @ApiResponse({
      description: `검색된 ${bodyDto.name} 데이터`,
      type: bodyDto,
    })
    async findById(
      @Param('id') id: string,
      @AuthToken() token: AuthTokenInfo,
    ): Promise<T> {
      return this.safeService.findById(token, id);
    }

    @Patch(':id')
    @ApiOperation({ summary: `id에 해당하는 ${bodyDto.name} 데이터 갱신` })
    @ApiParam({ name: 'id', description: `해당 ${bodyDto.name}의 오브젝트 ID` })
    @ApiBody({ description: `갱신된 ${bodyDto.name} 데이터`, type: bodyDto })
    async findByIdAndUpdate(
      @Param('id') id: string,
      @Body() doc: Partial<T>,
      @AuthToken() token: AuthTokenInfo,
    ): Promise<T> {
      console.log('update in BaseController');
      console.log(doc);
      return this.safeService.findByIdAndUpdate(token, id, doc);
    }

    @Delete(':id')
    @ApiOperation({ summary: `id에 해당하는 ${bodyDto.name} 데이터 삭제` })
    @ApiParam({ name: 'id', description: `해당 ${bodyDto.name}의 오브젝트 ID` })
    @ApiResponse({
      description: `삭제된 ${bodyDto.name} 데이터의 수`,
      type: DeleteResult,
    })
    async findByIdAndRemove(
      @Param('id') id: string,
      @AuthToken() token: AuthTokenInfo,
    ): Promise<DeleteResult> {
      return this.safeService.findByIdAndRemove(token, id);
    }
  }
  return SafeController;
}
