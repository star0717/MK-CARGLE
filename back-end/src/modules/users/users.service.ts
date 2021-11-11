import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync, hashSync } from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';
import { UserInfo } from 'src/models/auth.entity';
import { BaseService } from '../../lib/base-crud/base-crud.service';
import { User } from '../../models/user.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectModel(User) readonly model: ReturnModelType<typeof User>) {
    super(model);
  }

  async findUserBySignInInfo(userInfo: UserInfo): Promise<User> {
    console.log('findUserBySignInInfo');

    // ID를 실제 DB의 식별자로 매핑
    const searchOption: Partial<User> = {
      email: userInfo.id,
    };

    // 비밀번호 비교를 위해 패스워드까지 조회
    const user: User = await this.model.findOne(searchOption).select('+password');
    if (!user) {
      throw new UnauthorizedException();
    }
    // 비밀번호 확인
    const result = compareSync(userInfo.pwd, user.password);
    console.log(user);

    if (result) {
      return user;
    } else return null;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email });
  }

  async findUserByHpNumber(hpNumber: string): Promise<User> {
    return await this.model.findOne({ hpNumber });
  }
}
