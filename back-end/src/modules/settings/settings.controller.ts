import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Req,
  Res,
  Query,
  Post,
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
import {
  AuthTokenInfo,
  HelpChangePWD,
  ConfirmPWD,
  SignUpInfo,
} from 'src/models/auth.entity';
import { SettingsService } from './settings.service';
import { User, UserAuthority } from 'src/models/user.entity';
import { Company } from 'src/models/company.entity';
import { FindParameters, FindResult } from 'src/models/base.entity';
import { AuthToken } from 'src/lib/decorators/decorators';

@ApiTags('설정(마이페이지) API')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOperation({ summary: '[WORKER] 비밀번호 확인' })
  @ApiBody({
    description: '로그인된 사용자의 오브젝트 ID와 비밀번호',
    type: ConfirmPWD,
  })
  @ApiResponse({
    description:
      '성공: true, 실패: false. 성공시엔 변경된 비밀번호가 메일로 전송',
  })
  @Post('users/confirm/password')
  async comfirmPassword(
    @Body() data: ConfirmPWD,
    @AuthToken({ auth: UserAuthority.WORKER }) token: AuthTokenInfo,
  ): Promise<boolean> {
    return await this.settingsService.comfirmPassword(token, data);
  }

  @ApiOperation({ summary: '[WORKER] 내 정보 조회' })
  @ApiResponse({
    description: '회사 정보와 사용자 정보',
    type: SignUpInfo,
  })
  @Get('myinfo')
  async findMyInfo(
    @AuthToken({ auth: UserAuthority.WORKER }) token: AuthTokenInfo,
  ): Promise<SignUpInfo> {
    return await this.settingsService.findMyInfo(token);
  }

  @ApiOperation({ summary: '[WORKER] 패스워드 변경' })
  @ApiParam({ name: 'id', description: '사용자 오브젝트 ID' })
  @ApiBody({
    description: '현재 비번과 신규 비번',
    type: HelpChangePWD,
  })
  @ApiResponse({
    description:
      '성공: true, 실패: false. 성공시엔 변경된 비밀번호가 메일로 전송',
  })
  @Patch('users/password/:id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() data: HelpChangePWD,
    @AuthToken({ auth: UserAuthority.WORKER })
    token: AuthTokenInfo,
  ): Promise<boolean> {
    console.log(data);

    return await this.settingsService.updateUserPassword(token, id, data);
  }

  @ApiOperation({ summary: '[WORKER] 사용자 정보 변경' })
  @ApiParam({ name: 'id', description: '사용자 오브젝트 ID' })
  @ApiBody({
    description:
      '변경할 사용자 정보. name, hpNumber, address, joinDate 만 허용. 클라이언트가 업주일 경우 approval까지 허용',
    type: PartialType<User>(User),
  })
  @ApiResponse({ description: '변경된 사용자 정보', type: User })
  @Patch('users/:id')
  async updateUserInfo(
    @Param('id') id: string,
    @Body() user: User,
    @AuthToken({ auth: UserAuthority.WORKER })
    token: AuthTokenInfo,
  ): Promise<User> {
    return await this.settingsService.updateUserInfo(token, id, user);
  }

  @ApiOperation({ summary: '[OWNER] 업체 정보 변경' })
  @ApiParam({ name: 'id', description: '업체 오브젝트 ID' })
  @ApiBody({
    description:
      '변경할 업체 정보. mbTypeNum, busType, busItem, phoneNum, faxNum 만 허용',
    type: PartialType<Company>(Company),
  })
  @ApiResponse({ description: '변경된 업체 정보', type: Company })
  @Patch('companies/:id')
  async updateCompanyInfo(
    @Param('id') id: string,
    @Body() company: Company,
    @AuthToken({ auth: UserAuthority.OWNER })
    token: AuthTokenInfo,
  ): Promise<Company> {
    return await this.settingsService.updateCompanyInfo(token, id, company);
  }

  @ApiOperation({ summary: '[OWNER] 작업자 조회' })
  @ApiResponse({
    description: `검색된 User 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  @Get('workers')
  async findWorkers(
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.OWNER })
    token: AuthTokenInfo,
  ): Promise<FindResult<User>> {
    return await this.settingsService.findWorksers(token, fParams);
  }
}
