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
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { CommonService } from 'src/lib/common/common.service';
import { AuthTokenInfo, HelpChangePWD } from 'src/models/auth.entity';
import { SettingsService } from './settings.service';
import { User } from 'src/models/user.entity';
import { Company } from 'src/models/company.entity';

@ApiTags('설정(마이페이지) API')
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly comService: CommonService,
  ) {}

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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() data: HelpChangePWD,
  ): Promise<boolean> {
    console.log(data);
    const token: AuthTokenInfo = this.comService.extractToken(req, res, true);
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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() user: Partial<User>,
  ): Promise<User> {
    const token: AuthTokenInfo = this.comService.extractToken(req, res, true);
    const pUser: Partial<User> = {};
    if (user.hpNumber) pUser.hpNumber = user.hpNumber;
    if (user.address) pUser.address = user.address;
    if (user.joinDate) pUser.joinDate = user.joinDate;
    return await this.settingsService.updateUserInfo(token, id, pUser);
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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() company: Partial<Company>,
  ): Promise<Company> {
    const token: AuthTokenInfo = this.comService.extractToken(req, res, true);
    var pUser: Partial<Company> = {};
    if (company.mbTypeNum) pUser.mbTypeNum = company.mbTypeNum;
    if (company.busType) pUser.busType = company.busType;
    if (company.busItem) pUser.busItem = company.busItem;
    if (company.phoneNum) pUser.phoneNum = company.phoneNum;
    if (company.faxNum) pUser.faxNum = company.faxNum;
    if (company.address) pUser.address = company.address;
    return await this.settingsService.updateCompanyInfo(token, id, pUser);
  }
}
