import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Company, CompanyApproval } from 'src/models/company.entity';
import { User, UserAuthority } from 'src/models/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User) readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Company)
    readonly companyModel: ReturnModelType<typeof Company>,
  ) {}

  async dropUsers() {
    return await this.userModel.collection.drop();
  }

  async dropCompanies() {
    return await this.companyModel.collection.drop();
  }

  async createAdmin() {
    var user: Partial<User> = {
      address: '대전 유성구 송림로 13',
      approval: true,
      auth: UserAuthority.OWNER,
      email: 'park.choongbum@gmail.com',
      hpNumber: '01029206090',
      name: '박충범',
      password: 'test1234',
    };

    var company: Partial<Company> = {
      address: '대전 유성구 은구비로 8',
      approval: CompanyApproval.DONE,
      comRegNum: '3388800960',
      mbRegNum: '3388800960',
      mbTypeNum: '1',
      name: '엠케이카센터',
      phoneNum: '16443486',
      ownerName: '변무영',
    };

    user = await this.userModel.create(user);
    company = await this.companyModel.create(company);

    const updateDoc = {
      _uID: user._id,
      _cID: company._id,
    };

    console.log(user);
    console.log(updateDoc);
    user = await this.userModel.findByIdAndUpdate(user._id, updateDoc, {
      new: true,
    });
    console.log(user);
    company = await this.companyModel.findByIdAndUpdate(
      company._id,
      updateDoc,
      { new: true },
    );

    return {
      user,
      company,
    };
  }
}
