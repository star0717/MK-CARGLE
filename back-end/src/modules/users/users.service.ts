import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync, hashSync } from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';
import { UserInfo } from 'src/models/auth.entity';
import { BaseService } from '../../lib/base-crud/base-crud.service';
import { User, UserAuthority } from '../../models/user.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User) readonly model: ReturnModelType<typeof User>,
  ) {
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

  /**
   * 특정 업체에 소속된 모든 사용자(사업주 포함)를 삭제
   * @param comID 해당 업체의 ObjectID
   */
  async removeUsersByComID(comID: string) {
    const res = await this.model.deleteMany({ _cID: comID });
    console.log("deleted workers: " + res.deletedCount);
  }

  /**
   * 작업자를 삭제함
   * @param id 작업자의 ObjectID
   * @param comID 작업자의 comID
   * @returns 
   */
  async removeWorker(id: string, comID: string) {
    return await this.model.findOneAndRemove({ _id: id, _cID: comID, auth: UserAuthority.WORKER });
  }

  /**
   * 사업자를 삭제함
   * @param id 사업자의 ObjectID
   * @param comID 사업자의 comID
   * @returns 
   */
  async removeOwner(id: string, comID: string) {
    return await this.model.findOneAndRemove({ _id: id, _cID: comID, auth: UserAuthority.OWNER });
  }

}
