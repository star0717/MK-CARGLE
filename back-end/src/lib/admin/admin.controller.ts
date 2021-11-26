import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Company } from 'src/models/company.entity';
import { CommonService } from '../common/common.service';
import { AuthToken, Public } from '../decorators/decorators';
import { AdminService } from './admin.service';
import { UserAuthority } from 'src/models/user.entity';

@Controller('admin')
@ApiTags('관리자 API')
export class AdminController {
  constructor(
    private readonly service: AdminService,
    private readonly commonService: CommonService,
  ) {}

  @Public()
  @Get('drop/users')
  @ApiOperation({ description: '사용자 컬렉션 삭제' })
  async dropUsers() {
    await this.service.dropUsers();
  }

  @Public()
  @Get('drop/companies')
  @ApiOperation({ description: '업체 컬렉션 삭제' })
  async dropCompanies() {
    await this.service.dropCompanies();
  }

  @Public()
  @Get('drop/all')
  @ApiOperation({ description: '전체 컬렉션 삭제' })
  async dropAll() {
    await this.service.dropUsers();
    await this.service.dropCompanies();
  }

  @Public()
  @Get('create/admin')
  @ApiOperation({ description: '어드민 계정 생성' })
  async createAdmin() {
    return await this.service.createAdmin();
  }

  @Patch('approve/company/:id')
  @ApiOperation({
    description: '업체와 대표자 사용승인. busItem, busType도 동시 변경 가능',
  })
  @ApiParam({ name: 'id', description: '승인할 업체의 오브젝트ID' })
  @ApiBody({
    description: '로그인에 사용될 정보',
    type: PartialType<Company>(Company),
  })
  async approveCompany(
    @Param('id') id: string,
    @Body() company: Partial<Company>,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ): Promise<Company> {
    var pCompany: Partial<Company> = {};
    if (company.busItem) pCompany.busItem = company.busItem;
    if (company.busType) pCompany.busType = company.busType;
    console.log(pCompany);
    return await this.service.approveCompany(id, pCompany);
  }

  @Patch('reject/company/:id')
  @ApiOperation({
    description: '업체 승인요청 거부. 대표자의 승인도 동시 취소',
  })
  @ApiParam({ name: 'id', description: '거부할 업체의 오브젝트ID' })
  async rejectCompany(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ): Promise<Company> {
    return await this.service.rejectCompany(id);
  }

  @Delete('delete/company/:id')
  @ApiOperation({ description: '업체 삭제. 대표자와 직원들도 모두 삭제' })
  @ApiParam({ name: 'id', description: '삭제할 업체의 오브젝트ID' })
  async deleteCompany(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ) {
    this.service.deleteCompany(token, id);
  }
}
