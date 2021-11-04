import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseControllerFactory } from 'src/lib/base-crud/base-crud.controller';
import { User } from 'src/models/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags("유저 API")
export class UsersController extends BaseControllerFactory<User>(User) {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
