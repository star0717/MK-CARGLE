import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { getCrnPath, getMrnPath } from 'src/config/configuration';
import { AuthTokenInfo, SignUpInfo } from 'src/models/auth.entity';
import { FindParameters, FindResult } from 'src/models/base.entity';
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
      address1: '대전 유성구 송림로 13',
      approval: true,
      auth: UserAuthority.OWNER,
      email: 'park.choongbum@gmail.com',
      hpNumber: '01029206090',
      name: '박충범',
      password: 'test1234',
    };

    var company: Partial<Company> = {
      address1: '대전 유성구 은구비로 8',
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

  async findReqReviewCompanies(
    token: AuthTokenInfo,
    fParams: FindParameters,
  ): Promise<FindResult<Company>> {
    fParams.filter = { approval: CompanyApproval.ING } as Partial<Company>;
    return this.companiesService.findByOptions(token, fParams);
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
    const mailData = this.commonService.emailDataToApproveOwner();
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
    const mailData = this.commonService.emailDataToRejectOwner();
    this.commonService.sendMail(user.email, mailData.title, mailData.content);
    return company;
  }

  async deleteCompany(token: AuthTokenInfo, id: string) {
    await this.usersService.deleteAllByComID(token, id);
    await this.companiesService.findByIdAndRemoveForAuth(id);
  }

  async getComRegFileName(token: AuthTokenInfo, id: string) {
    const company = await this.companiesService.findById(token, token.cID);
    var fileName = company.comRegNum;

    const fileList = await this.commonService.getFileNames(
      getCrnPath(),
      fileName,
    );

    if (fileList.length == 0) {
      throw new NotFoundException();
    }

    return fileList[0];
  }

  async getMainRegFileName(token: AuthTokenInfo, id: string) {
    const company = await this.companiesService.findById(token, token.cID);
    var fileName = company.mbRegNum;

    const fileList = await this.commonService.getFileNames(
      getMrnPath(),
      fileName,
    );

    if (fileList.length == 0) {
      throw new NotFoundException();
    }

    return fileList[0];
  }

  async findCompanies(
    token: AuthTokenInfo,
    fParams: FindParameters,
  ): Promise<FindResult<Company>> {
    return this.companiesService.findByOptions(token, fParams);
  }

  async findSignUpInfo(token: AuthTokenInfo, id: string): Promise<SignUpInfo> {
    let company: Company = await this.companiesService.findById(token, id);
    if (!company) throw new BadRequestException();
    let user: User = await this.usersService.findById(token, company._uID);
    if (!user) throw new BadRequestException();

    const info: SignUpInfo = {
      company,
      user,
    };

    return info;
  }

  private async updateCompanyInfo(
    token: AuthTokenInfo,
    id: string,
    company: Partial<Company>,
  ): Promise<Company> {
    var pDoc: Partial<Company> = {};
    if (company.mbTypeNum) pDoc.mbTypeNum = company.mbTypeNum;
    if (company.busType) pDoc.busType = company.busType;
    if (company.busItem) pDoc.busItem = company.busItem;
    if (company.phoneNum) pDoc.phoneNum = company.phoneNum;
    if (company.faxNum) pDoc.faxNum = company.faxNum;
    return await this.companiesService.findByIdAndUpdate(token, id, pDoc);
  }

  private async updateUserInfo(
    token: AuthTokenInfo,
    id: string,
    user: Partial<User>,
  ): Promise<User> {
    var pDoc: Partial<User> = {};
    if (user.hpNumber) pDoc.hpNumber = user.hpNumber;
    return await this.usersService.findByIdAndUpdate(token, id, pDoc);
  }

  async updateSignUpInfo(
    token: AuthTokenInfo,
    id: string,
    info: Partial<SignUpInfo>,
  ): Promise<SignUpInfo> {
    // 누락된 데이터가 있을 경우 익셉션 발생
    if (!info.company || !info.company._id || !info.user || !info.user._id)
      throw new BadRequestException();
    let user: User = info.user;
    let company: Company = info.company;

    user = await this.updateUserInfo(token, user._id, user);
    company = await this.updateCompanyInfo(token, company._id, company);
    const newInfo: SignUpInfo = {
      company,
      user,
    };

    return newInfo;
  }
}
