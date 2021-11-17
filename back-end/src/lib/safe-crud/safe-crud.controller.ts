import {
    Get, Post, Body, Patch, Param, Delete, Controller, Type, Injectable,
    ValidationPipe, ValidationPipeOptions, ArgumentMetadata, UsePipes, Query, UseGuards, Req, UnauthorizedException
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseEntity, DeleteResult, PaginateOptions, PaginateResult } from '../../models/base.entity';
import { SafeService } from "./safe-crud.service";
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { CompanyApproval } from 'src/models/company.entity';

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
    create(req: Request, doc: T): Promise<T>;
    findByOptions(req: Request, qeury: PaginateOptions): Promise<PaginateResult<T>>;
    findById(req: Request, id: string): Promise<T>;
    update(req: Request, id: string, doc: T): Promise<T>;
    remove(req: Request, id: string): Promise<DeleteResult>;
}



export function SafeControllerFactory<T extends BaseEntity = BaseEntity>(bodyDto: Type<T>): Type<IController<T>> {
    @Controller()
    // 가드 적용: 로그인 된 연결만을 허용
    @UseGuards(JwtAuthGuard)
    // 파이프 적용: DTO 데이터 검증
    @UsePipes(new AbstractValidationPipe({
        whitelist: true, forbidNonWhitelisted: false, transform: true
    }, { body: bodyDto }))
    class BaseController<T extends BaseEntity> implements IController<T>{
        constructor(private readonly safeService: SafeService<T>) { }

        /**
         * 토큰을 추출하여 반환. 추출 도중 잘못된 접근일 경우 익셉션 발생
         * @param req 토큰을 추출할 request
         * @returns 
         */
        private extractToken(@Req() req): AuthTokenInfo {
            const aToken: AuthTokenInfo = req.user;
            // 권한 검증
            if (aToken.cApproval != CompanyApproval.DONE || aToken.uApproval != true) {
                throw new UnauthorizedException();
            }
            // ID값 검증
            if (!aToken || !aToken.uID || !aToken.cID
                || aToken.uID == "" || aToken.cID == "") {
                throw new UnauthorizedException();
            }
            return aToken;
        }

        @Post()
        @ApiOperation({ summary: `새로운 ${bodyDto.name} 데이터 추가` })
        @ApiBody({ description: `추가할 ${bodyDto.name} 데이터`, type: bodyDto })
        @ApiCreatedResponse({ description: `추가된 ${bodyDto.name} 데이터`, type: bodyDto })
        async create(@Req() req, @Body() doc: T): Promise<T> {
            const aToken: AuthTokenInfo = this.extractToken(req);
            return this.safeService.create(aToken, doc);
        }

        @Get()
        @ApiOperation({ summary: `조건에 해당하는 ${bodyDto.name} 배열 데이터를 페이징 정보와 함께 반환` })
        @ApiResponse({ description: `검색된 ${bodyDto.name} 배열 데이터와 페이징 정보`, type: PaginateResult })
        async findByOptions(@Req() req, @Query() findQuery: PaginateOptions): Promise<PaginateResult<T>> {
            const aToken: AuthTokenInfo = this.extractToken(req);
            return this.safeService.findByOptions(aToken, findQuery);
        }

        @Get(':id')
        @ApiOperation({ summary: `id에 해당하는 ${bodyDto.name} 데이터 반환` })
        @ApiParam({ name: "id", description: `해당 ${bodyDto.name}의 오브젝트 ID` })
        @ApiResponse({ description: `검색된 ${bodyDto.name} 데이터`, type: bodyDto })
        async findById(@Req() req, @Param('id') id: string): Promise<T> {
            const aToken: AuthTokenInfo = this.extractToken(req);
            return this.safeService.findById(aToken, id);
        }

        @Patch(':id')
        @ApiOperation({ summary: `id에 해당하는 ${bodyDto.name} 데이터 갱신` })
        @ApiParam({ name: "id", description: `해당 ${bodyDto.name}의 오브젝트 ID` })
        @ApiBody({ description: `갱신된 ${bodyDto.name} 데이터`, type: bodyDto })
        async update(@Req() req, @Param('id') id: string, @Body() doc: Partial<T>): Promise<T> {
            const aToken: AuthTokenInfo = this.extractToken(req);
            console.log("update in BaseController");
            console.log(doc);
            return this.safeService.update(aToken, id, doc);
        }

        @Delete(':id')
        @ApiOperation({ summary: `id에 해당하는 ${bodyDto.name} 데이터 삭제` })
        @ApiParam({ name: "id", description: `해당 ${bodyDto.name}의 오브젝트 ID` })
        @ApiResponse({ description: `삭제된 ${bodyDto.name} 데이터의 수`, type: DeleteResult })
        async remove(@Req() req, @Param('id') id: string): Promise<DeleteResult> {
            const aToken: AuthTokenInfo = this.extractToken(req);
            return this.safeService.remove(aToken, id);
        }


    }
    return BaseController;
}