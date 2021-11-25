import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { CommonService } from 'src/lib/common/common.service';
import { AuthTokenInfo, HelpChangePWD } from 'src/models/auth.entity';
import { SettingsService } from './settings.service';
import { User, UserAuthority } from 'src/models/user.entity';
import { Company } from 'src/models/company.entity';
import { FindParameters, FindResult } from 'src/models/base.entity';
import { AuthToken } from 'src/lib/decorators/decorators';

@ApiTags('설정(마이페이지) API')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOperation({ summary: '패스워드 변경' })
  @ApiParam({ name: 'id', description: '사용자 오브젝트 ID' })
  @ApiBody({
    description: '현재 비번과 신규 비번',
    type: HelpChangePWD,
  })
  @ApiResponse({
    description:
      '성공: true, 실패: false. 성공시엔 변경된 비밀번호가 메일로 전송',
  })
  @Patch('user/password/:id')
  async UpdateUserPassword(
    @Param('id') id: string,
    @Body() data: HelpChangePWD,
    @AuthToken({ auth: UserAuthority.WORKER })
    token: AuthTokenInfo,
  ): Promise<boolean> {
    console.log(data);

    return await this.settingsService.updateUserPassword(token, id, data);
  }

  @ApiOperation({ summary: '사용자 정보 변경' })
  @ApiParam({ name: 'id', description: '사용자 오브젝트 ID' })
  @ApiBody({
    description: '변경할 사용자 정보. hpNumber, address, joinDate',
    type: PartialType<User>(User),
  })
  @ApiResponse({ description: '변경된 사용자 정보', type: User })
  @Patch('user/:id')
  async updateUserInfo(
    @Param('id') id: string,
    @Body() user: Partial<User>,
    @AuthToken({ auth: UserAuthority.WORKER })
    token: AuthTokenInfo,
  ): Promise<User> {
    return await this.settingsService.updateUserInfo(token, id, user);
  }

  @ApiOperation({ summary: '업체 정보 변경' })
  @ApiParam({ name: 'id', description: '업체 오브젝트 ID' })
  @ApiBody({
    description:
      '변경할 업체 정보. mbTypeNum, busType, busItem, phoneNum, faxNum, address',
    type: PartialType<Company>(Company),
  })
  @ApiResponse({ description: '변경된 업체 정보', type: Company })
  @Patch('company/:id')
  async updateCompanyInfo(
    @Param('id') id: string,
    @Body() company: Partial<Company>,
    @AuthToken({ auth: UserAuthority.OWNER })
    token: AuthTokenInfo,
  ): Promise<Company> {
    return await this.settingsService.updateCompanyInfo(token, id, company);
  }

  @ApiOperation({ summary: '승인된 작업자 조회' })
  @ApiResponse({
    description: `검색된 User 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  @Get('approved/users')
  async findApprovedWorkers(
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.OWNER })
    token: AuthTokenInfo,
  ): Promise<FindResult<User>> {
    return await this.settingsService.findApprovedWorkers(token, fParams);
  }

  @ApiOperation({ summary: '승인되지 않은 작업자 조회' })
  @ApiResponse({
    description: `검색된 User 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  @Get('unapproved/users')
  async findUnApprovedWorkers(
    // @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.OWNER })
    token: AuthTokenInfo,
  ): Promise<FindResult<User>> {
    // const token: AuthTokenInfo = this.comService.extractToken(req, res);
    return await this.settingsService.findUnApprovedWorkers(token, fParams);
  }
}
