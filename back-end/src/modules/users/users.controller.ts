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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthToken } from 'src/lib/decorators/decorators';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('사용자 (User) API')
export class UsersController extends SafeControllerFactory<User>(User) {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  /**
   * Safe-CRUD 오버라이딩
   */
  @Post()
  @ApiOperation({
    summary: `[DISABLED]`,
  })
  async create(
    @Body() doc: User,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<User> {
    throw new NotAcceptableException();
  }

  @Get()
  @ApiOperation({
    summary: `[DISABLED]`,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<FindResult<User>> {
    throw new NotAcceptableException();
  }

  @Patch(':id')
  @ApiOperation({
    summary: `[DISABLED]`,
  })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() doc: User,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<User> {
    throw new NotAcceptableException();
  }

  @Delete(':id')
  @ApiOperation({
    summary: `[DISABLED]`,
  })
  async findByIdAndRemove(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    throw new NotAcceptableException();
  }
}
