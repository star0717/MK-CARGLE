import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { AuthTokenInfo, UserInfo } from 'src/models/auth.entity';
import { DeleteResult } from 'src/models/base.entity';
import { User } from 'src/models/user.entity';

@Injectable()
export class UsersService extends SafeService<User> {
  constructor(
    @InjectModel(User) readonly model: ReturnModelType<typeof User>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }

  async signUp(user: User): Promise<User> {
    return await this._create(user);
  }

  async findByIdAndUpdateForAuth(
    id: string,
    doc: Partial<User>,
  ): Promise<User> {
    return await this._findByIdAndUpdate(id, doc);
  }

  async findByUserInfoForAuth(info: UserInfo): Promise<User> {
    // ID를 실제 DB의 식별자로 매핑
    const searchOption: Partial<User> = {
      email: info.id,
    };

    // 비밀번호 비교를 위해 패스워드까지 조회
    const user: User = await this.model
      .findOne(searchOption)
      .select('+password');
    if (!user) {
      throw new UnauthorizedException();
    }
    // 비밀번호 확인
    const result = compareSync(info.pwd, user.password);

    if (result) {
      return user;
    } else return null;
  }

  async deleteAllByComID(
    token: AuthTokenInfo,
    _cID: string,
  ): Promise<DeleteResult> {
    return await this._deleteMany(token, { _cID });
  }

  // async isExistEmailforAuth(email: string): Promise<boolean> {
  //   return await this.model.exists({ email });
  // }

  // async isExistHpNumberforAuth(hpNumber: string): Promise<boolean> {
  //   return await this.model.exists({ hpNumber });
  // }

  async findByFieldForAuth(doc: Partial<User>): Promise<User> {
    return await this.model.findOne(doc);
  }
}
