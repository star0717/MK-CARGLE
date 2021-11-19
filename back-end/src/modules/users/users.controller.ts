import {
  Controller,
  Post,
  Body,
  Req,
  NotAcceptableException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
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
  async create(@Req() req, @Body() doc: User): Promise<User> {
    throw new NotAcceptableException();
  }
}
