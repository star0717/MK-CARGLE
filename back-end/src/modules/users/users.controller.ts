import {
  Controller,
  Post,
  Body,
  NotAcceptableException,
  Patch,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthToken } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('사용자 (User) API')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 User 데이터 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 User 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 User 데이터`,
    type: User,
  })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<User> {
    return await this.service.findById(token, id);
  }

  @Post('fcmtoken/:id')
  @ApiOperation({
    summary: `[WORKER] FCM 토큰 등록`,
  })
  @ApiParam({ name: 'id', description: `해당 User 오브젝트 ID` })
  @ApiBody({
    description: `등록/갱신할 FcmToken 데이터.`,
    type: User,
  })
  @ApiCreatedResponse({
    description: `패치 성공여부`,
    type: Boolean,
  })
  async regFcmToken(
    @Param('id') id: string,
    @Body() doc: User,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<boolean> {
    const user: User = await this.service.regFcmToken(token, id, doc);
    if (user) return true;
    return false;
  }
}
