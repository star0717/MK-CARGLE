import {
  Controller,
  Post,
  Body,
  NotAcceptableException,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthToken } from 'src/lib/decorators/decorators';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { DeleteResult } from 'src/models/base.entity';
import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('업체 API')
export class UsersController extends SafeControllerFactory<User>(User) {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  /**
   * Safe-CRUD 오버라이딩
   */
  @Post()
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async create(
    @Body() doc: User,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<User> {
    throw new NotAcceptableException();
  }

  @Patch(':id')
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() doc: Partial<User>,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<User> {
    throw new NotAcceptableException();
  }

  @Delete(':id')
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async findByIdAndRemove(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    throw new NotAcceptableException();
  }
}
