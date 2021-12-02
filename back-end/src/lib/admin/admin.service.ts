import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Company, CompanyApproval } from 'src/models/company.entity';
import { User, UserAuthority } from 'src/models/user.entity';
import { CompaniesService } from 'src/modules/companies/companies.service';
import { UsersService } from 'src/modules/users/users.service';
import { CommonService } from '../common/common.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User) readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Company)
    readonly companyModel: ReturnModelType<typeof Company>,
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly commonService: CommonService,
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

  async approveCompany(id: string, doc: Partial<Company>): Promise<Company> {
    doc.approval = CompanyApproval.DONE;
    const company = await this.companiesService.findByIdAndUpdateForAuth(
      id,
      doc,
    );
    if (!company) throw new BadRequestException();
    const user = await this.usersService.findByIdAndUpdateForAuth(
      company._uID,
      {
        approval: true,
      },
    );
    if (!user) throw new BadRequestException();
    const mailData = this.commonService.emailDataForApproved();
    this.commonService.sendMail(user.email, mailData.title, mailData.content);
    return company;
  }

  async rejectCompany(id: string): Promise<Company> {
    const company = await this.companiesService.findByIdAndUpdateForAuth(id, {
      approval: CompanyApproval.ING,
    });
    if (!company) throw new BadRequestException();
    const user = await this.usersService.findByIdAndUpdateForAuth(
      company._uID,
      {
        approval: false,
      },
    );
    if (!user) throw new BadRequestException();
    const mailData = this.commonService.emailDataForRejectApproval();
    this.commonService.sendMail(user.email, mailData.title, mailData.content);
    return company;
  }

  async deleteCompany(token: AuthTokenInfo, id: string) {
    await this.usersService.deleteAllByComID(token, id);
    await this.companiesService.findByIdAndRemoveForAuth(id);
  }

  async updateCompanyInfo(
    token: AuthTokenInfo,
    id: string,
    company: Partial<Company>,
  ): Promise<Company> {
    var pUser: Partial<Company> = {};
    if (company.mbTypeNum) pUser.mbTypeNum = company.mbTypeNum;
    if (company.busType) pUser.busType = company.busType;
    if (company.busItem) pUser.busItem = company.busItem;
    if (company.phoneNum) pUser.phoneNum = company.phoneNum;
    if (company.faxNum) pUser.faxNum = company.faxNum;
    // return await this.companiesService.findByIdAndUpdate(token, id, pUser);
    return;
  }
}
