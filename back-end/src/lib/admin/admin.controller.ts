import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
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
import { createReadStream } from 'fs';
import { getCrnPath, getMrnPath } from 'src/config/configuration';
import { join } from 'path';

@Controller('admin')
@ApiTags('시스템 관리자 API')
export class AdminController {
  constructor(
    private readonly service: AdminService,
    private readonly commonService: CommonService,
  ) {}

  @Public()
  @Get('drop/users')
  @ApiOperation({ summary: '[PUBLIC] 사용자 컬렉션 삭제' })
  async dropUsers() {
    await this.service.dropUsers();
  }

  @Public()
  @Get('drop/companies')
  @ApiOperation({ summary: '[PUBLIC] 업체 컬렉션 삭제' })
  async dropCompanies() {
    await this.service.dropCompanies();
  }

  @Public()
  @Get('drop/all')
  @ApiOperation({ summary: '[PUBLIC] 전체 컬렉션 삭제' })
  async dropAll() {
    await this.service.dropUsers();
    await this.service.dropCompanies();
  }

  @Public()
  @Get('create/admin')
  @ApiOperation({ summary: '[PUBLIC] 어드민 계정 생성' })
  async createAdmin() {
    return await this.service.createAdmin();
  }

  @Patch('review/approve/companies/:id')
  @ApiOperation({
    summary:
      '[ADMIN] 업체와 대표자 사용승인. busItem, busType도 동시 변경 가능',
  })
  @ApiParam({ name: 'id', description: '승인할 업체의 오브젝트ID' })
  @ApiBody({
    description: '로그인에 사용될 정보',
    type: PartialType<Company>(Company),
  })
  async approveCompany(
    @Param('id') id: string,
    @Body() company: Company,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ): Promise<Company> {
    var pCompany: Partial<Company> = {};
    if (company.busItem) pCompany.busItem = company.busItem;
    if (company.busType) pCompany.busType = company.busType;
    console.log(pCompany);
    return await this.service.approveCompany(id, pCompany);
  }

  @Patch('review/reject/companies/:id')
  @ApiOperation({
    summary: '[ADMIN] 업체 승인요청 거부. 대표자의 승인도 동시 취소',
  })
  @ApiParam({ name: 'id', description: '거부할 업체의 오브젝트ID' })
  async rejectCompany(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ): Promise<Company> {
    return await this.service.rejectCompany(id);
  }

  @Delete('review/delete/companies/:id')
  @ApiOperation({
    summary: '[ADMIN] 업체 삭제. 대표자와 직원들도 모두 삭제',
  })
  @ApiParam({ name: 'id', description: '삭제할 업체의 오브젝트ID' })
  async deleteCompany(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ) {
    return this.service.deleteCompany(token, id);
  }

  @Get('review/com-reg-doc/:id')
  @ApiOperation({ summary: '[ADMIN] 업체의 사업자 등록증 반환' })
  @ApiParam({ name: 'id', description: '업체의 오브젝트ID' })
  async getComRegDoc(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.WORKER })
    token: AuthTokenInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileName = await this.service.getComRegFileName(token, id);
    if (!fileName) throw new NotFoundException();
    const extension = this.commonService.getFileExtension(fileName);

    var conType: string;
    switch (extension) {
      case 'jpg' || 'jpeg':
        conType = 'image/jpeg';
        break;
      case 'png':
        conType = 'image/png';
        break;
      case 'pdf':
        conType = 'application/pdf';
        break;
    }

    res.set({
      'Content-Type': conType,
      'Content-Disposition': 'inline',
    });

    const file = createReadStream(join(process.cwd(), getCrnPath() + fileName));
    return new StreamableFile(file);
  }

  @Get('review/main-reg-doc/:id')
  @ApiOperation({ summary: '[ADMIN] 업체의 사업자 등록증 반환' })
  @ApiParam({ name: 'id', description: '업체의 오브젝트ID' })
  async getMainRegDoc(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileName = await this.service.getMainRegFileName(token, id);
    if (!fileName) throw new NotFoundException();
    const extension = this.commonService.getFileExtension(fileName);

    var conType: string;
    switch (extension) {
      case 'jpg' || 'jpeg':
        conType = 'image/jpeg';
        break;
      case 'png':
        conType = 'image/png';
        break;
      case 'pdf':
        conType = 'application/pdf';
        break;
    }

    res.set({
      'Content-Type': conType,
      'Content-Disposition': 'inline',
    });

    const file = createReadStream(join(process.cwd(), getMrnPath() + fileName));
    return new StreamableFile(file);
  }

  @Patch('companies/:id')
  @ApiOperation({ summary: '[ADMIN] 회사 정보 수정' })
  @ApiParam({ name: 'id', description: '업체의 오브젝트ID' })
  @ApiBody({
    description:
      '변경할 업체 정보. mbTypeNum, busType, busItem, phoneNum, faxNum 만 허용',
    type: PartialType<Company>(Company),
  })
  async updateCompanyInfo(
    @Param('id') id: string,
    @Body() company: Company,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ): Promise<Company> {
    console.log(company);
    return await this.service.updateCompanyInfo(token, id, company);
  }
}
