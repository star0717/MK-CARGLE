import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotAcceptableException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { User } from 'src/models/user.entity';
import { Users2Service } from './users2.service';

@Controller('users2')
@ApiTags('유저 API v2')
export class Users2Controller extends SafeControllerFactory<User>(User) {
  constructor(private readonly usersService: Users2Service) {
    super(usersService);
  }

  /**
   * Safe-CRUD 오버라이딩
   */

  @Post()
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async create(@Req() req, @Body() doc: User): Promise<User> {
    throw new NotAcceptableException();
  }
}
