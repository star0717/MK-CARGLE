import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Res,
  Query,
  Post,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBody,
  ApiConsumes,
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
import {
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { AuthToken } from 'src/lib/decorators/decorators';
import { stampFileInterceptor } from 'src/config/multer.option';
import { createReadStream } from 'fs';
import { join } from 'path';
import { getStampPath } from 'src/config/configuration';

@ApiTags('설정(마이페이지) API')
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly comService: CommonService,
  ) {}

  @ApiOperation({ summary: '[WORKER] 비밀번호 확인' })
  @ApiBody({
    description: '로그인된 사용자의 오브젝트 ID와 비밀번호',
    type: ConfirmPWD,
  })
  @ApiResponse({
    description:
      '성공: true, 실패: false. 성공시엔 변경된 비밀번호가 메일로 전송',
  })
  @Post('myinfo/confirm/password')
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

  @ApiOperation({
    summary: '[WORKER] 내 정보 변경',
    description:
      '변경할 내 정보. OWNER: User와 Company 정보 수정 가능. WORKER: User 정보만 수정 가능',
  })
  @ApiBody({
    description:
      'User: name, hpNumber, address, joinDate 수정 가능. Company: mbTypeNum, busType, busItem, phoneNum, faxNum 수정 가능',
    type: PartialType<SignUpInfo>(SignUpInfo),
  })
  @ApiResponse({ description: '변경된 내 정보', type: SignUpInfo })
  @Patch('myinfo')
  async updateMyInfo(
    @Body() data: SignUpInfo,
    @AuthToken({ auth: UserAuthority.WORKER }) token: AuthTokenInfo,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignUpInfo> {
    const newSignInfo: SignUpInfo = await this.settingsService.updateMyInfo(
      token,
      data,
    );

    this.comService.injectToken(newSignInfo, res);
    return newSignInfo;
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
  @Patch('myinfo/change/password/:id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() data: HelpChangePWD,
    @AuthToken({ auth: UserAuthority.WORKER })
    token: AuthTokenInfo,
  ): Promise<boolean> {
    console.log(data);

    return await this.settingsService.updateUserPassword(token, id, data);
  }

  @ApiOperation({ summary: '[OWNER] 업체 도장 파일명 반환' })
  @ApiResponse({ description: '도장 파일명', type: String })
  @Get('myinfo/stamp/filename')
  async getStampFileName(
    @AuthToken({ auth: UserAuthority.OWNER }) token: AuthTokenInfo,
  ): Promise<string> | null {
    return await this.settingsService.getStampFileName(token);
  }

  @ApiOperation({ summary: '[OWNER] 업체 도장 파일 업로드/갱신' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'image/jpeg|image/png 타입의 도장 이미지 파일',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ description: '도장 파일명', type: String })
  @UseInterceptors(stampFileInterceptor)
  @Patch('myinfo/stamp')
  async patchStampFile(
    @UploadedFile() file: Express.Multer.File,
    @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
  ): Promise<string> {
    return await this.settingsService.patchStampFile(token, file);
  }

  @ApiOperation({ summary: '[OWNER] 업체 도장 파일 반환' })
  @Get('myinfo/stamp')
  async getStampFile(
    @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileName = await this.settingsService.getStampFileName(token);
    if (!fileName) throw new NotFoundException();
    const extension = this.comService.getFileExtension(fileName);

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

    const file = createReadStream(
      join(process.cwd(), getStampPath() + fileName),
    );
    return new StreamableFile(file);
  }

  @ApiOperation({ summary: '[OWNER] 작업자 조회' })
  @ApiResponse({
    description: `검색된 User 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  @Get('management/workers')
  async findWorkers(
    @Query() fParams: FindParameters,
    @AuthToken({ auth: UserAuthority.OWNER }) token: AuthTokenInfo,
  ): Promise<FindResult<User>> {
    return await this.settingsService.findWorksers(token, fParams);
  }

  @ApiOperation({ summary: '[OWNER] 작업자 승인' })
  @ApiParam({ name: 'id', description: '승인할 작업자의 오브젝트ID' })
  @ApiResponse({ description: '승인된 사용자 정보', type: User })
  @Patch('management/approve/workers/:id')
  async approveWorker(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.OWNER }) token: AuthTokenInfo,
  ): Promise<User> {
    return await this.settingsService.approveWorker(token, id);
  }

  @ApiOperation({ summary: '[OWNER] 작업자 승인 거부' })
  @ApiParam({ name: 'id', description: '승인 거부할 작업자의 오브젝트ID' })
  @ApiResponse({ description: '승인 거부된 사용자 정보', type: User })
  @Patch('management/reject/workers/:id')
  async rejectWorker(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.OWNER }) token: AuthTokenInfo,
  ): Promise<User> {
    return await this.settingsService.rejectWorker(token, id);
  }

  @ApiOperation({ summary: '[OWNER] 작업자 삭제' })
  @ApiParam({ name: 'id', description: '삭제할 작업자의 오브젝트ID' })
  @ApiResponse({ description: '삭제된 데이터의 수', type: DeleteResult })
  @Patch('management/delete/workers/:id')
  async deleteWorker(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.OWNER }) token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    return await this.settingsService.deleteWorker(token, id);
  }

  @ApiOperation({ summary: '[OWNER] 작업자 정보 수정' })
  @ApiParam({ name: 'id', description: '수정할 작업자의 오브젝트ID' })
  @ApiBody({ description: '수정할 작업자의 정보. joinDate만 허용', type: User })
  @ApiResponse({ description: '수정된 작업자의 정보', type: User })
  @Patch('/management/workers/:id')
  async updateWorkerInfo(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.OWNER }) token: AuthTokenInfo,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return await this.settingsService.updateWorkerInfo(token, id, user);
  }
}
