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
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { AuthTokenInfo, SignUpInfo } from 'src/models/auth.entity';
import { Company, CompanyApproval } from 'src/models/company.entity';
import { CommonService } from '../common/common.service';
import { AuthToken, Public } from '../decorators/decorators';
import { AdminService } from './admin.service';
import { User, UserAuthority } from 'src/models/user.entity';
import { createReadStream } from 'fs';
import { getCrnPath, getMrnPath } from 'src/config/configuration';
import { join } from 'path';
import {
  OptionalInfo,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';

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
    type: Company,
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
  @ApiBody({
    description: '거절 사유가 있을 시 info1에 기입하여 전송',
    type: OptionalInfo,
  })
  async rejectCompany(
    @Param('id') id: string,
    @Body() addInfo: OptionalInfo,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ): Promise<Company> {
    return await this.service.rejectCompany(id, addInfo);
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
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('hi');
    const fileName = await this.service.getComRegFileName(token, id);
    console.log(fileName);
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
  @ApiOperation({ summary: '[ADMIN] 업체의 정비업 등록증 반환' })
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

  @Get('companies')
  @ApiOperation({
    summary: `[ADMIN] 업체 정보를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 Company 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findCompanies(
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<FindResult<Company>> {
    return await this.service.findCompanies(token, fParams);
  }

  @Get('before/companies')
  @ApiOperation({
    summary: `[ADMIN] approval이 BEFORE 단계인 업체 정보를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 Company 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findBeforeCompanies(
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<FindResult<Company>> {
    fParams.filter = { approval: CompanyApproval.BEFORE } as Partial<Company>;
    return await this.service.findCompanies(token, fParams);
  }

  @Get('ing/companies')
  @ApiOperation({
    summary: `[ADMIN] approval이 ING 단계인 업체 정보를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 Company 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findIngCompanies(
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<FindResult<Company>> {
    fParams.filter = { approval: CompanyApproval.ING } as Partial<Company>;
    return await this.service.findCompanies(token, fParams);
  }

  @Get('done/companies')
  @ApiOperation({
    summary: `[ADMIN] approval이 DONE 단계인 업체 정보를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 Company 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findDoneCompanies(
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<FindResult<Company>> {
    fParams.filter = { approval: CompanyApproval.DONE } as Partial<Company>;
    return await this.service.findCompanies(token, fParams);
  }

  @Get('users')
  @ApiOperation({
    summary: `[ADMIN] 모든 사용자의 정보를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 User 배열 데이터와 페이징 정보`,
  })
  async findUsers(
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<FindResult<User>> {
    return await this.service.findUsers(token, fParams);
  }

  @Get('users/:id')
  @ApiOperation({
    summary: `[ADMIN] 특정 업체의 사용자의 정보를 페이징 정보와 함께 반환`,
  })
  @ApiParam({ name: 'id', description: '업체의 오브젝트ID' })
  @ApiResponse({
    description: `검색된 User 배열 데이터와 페이징 정보`,
  })
  async findCompanyUsers(
    @Param('id') id: string,
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.ADMIN }) token: AuthTokenInfo,
  ): Promise<FindResult<User>> {
    fParams.filter = { _cID: id } as Partial<User>;
    return await this.service.findUsers(token, fParams);
  }

  @Get('signup-info/:id')
  @ApiOperation({ summary: '[ADMIN] 업체 가입 정보 조회' })
  @ApiParam({ name: 'id', description: '업체의 오브젝트ID' })
  @ApiResponse({
    description: `업체 가입 정보`,
    type: SignUpInfo,
  })
  async findSignUpInfo(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ): Promise<SignUpInfo> {
    return await this.service.findSignUpInfo(token, id);
  }

  @Patch('signup-info/:id')
  @ApiOperation({ summary: '[ADMIN] 업체 가입 정보 수정' })
  @ApiParam({ name: 'id', description: '업체의 오브젝트ID' })
  @ApiBody({
    description:
      '변경할 업체 정보. Company: mbTypeNum, busType, busItem, phoneNum, faxNum 만 허용. User: hpNumber 만 허용',
    type: SignUpInfo,
  })
  @ApiResponse({
    description: `변경된 업체 가입 정보`,
    type: SignUpInfo,
  })
  async updateSignUpInfo(
    @Param('id') id: string,
    @Body() info: SignUpInfo,
    @AuthToken({ auth: UserAuthority.ADMIN })
    token: AuthTokenInfo,
  ): Promise<SignUpInfo> {
    return await this.service.updateSignUpInfo(token, id, info);
  }
}
