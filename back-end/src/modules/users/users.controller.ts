import {
  Controller,
  Post,
  Body,
  Req,
  NotAcceptableException,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { DeleteResult } from 'src/models/base.entity';
import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('유저 API')
export class UsersController extends SafeControllerFactory<User>(User) {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  /**
   * Safe-CRUD 오버라이딩
   */
  @Post()
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async create(@Req() req, @Res() Res, @Body() doc: User): Promise<User> {
    throw new NotAcceptableException();
  }

  @Patch(':id')
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async findByIdAndUpdate(
    @Req() req,
    @Res() Res,
    @Param('id') id: string,
    @Body() doc: Partial<User>,
  ): Promise<User> {
    throw new NotAcceptableException();
  }

  @Delete(':id')
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async findByIdAndRemove(
    @Req() req,
    @Res() Res,
    @Param('id') id: string,
  ): Promise<DeleteResult> {
    throw new NotAcceptableException();
  }
}
