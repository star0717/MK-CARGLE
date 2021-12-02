import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CommonService } from 'src/lib/common/common.service';
import {
  AuthTokenInfo,
  HelpChangePWD,
  UserInfo,
  ConfirmPWD,
  SignUpInfo,
} from 'src/models/auth.entity';
import { FindParameters, FindResult } from 'src/models/base.entity';
import { Company } from 'src/models/company.entity';
import { User, UserAuthority } from 'src/models/user.entity';
import { CompaniesService } from '../companies/companies.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SettingsService {
  constructor(
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private readonly commonService: CommonService,
  ) {}

  async comfirmPassword(
    token: AuthTokenInfo,
    data: ConfirmPWD,
  ): Promise<boolean> {
    if (token.uID != data._id) throw new UnauthorizedException();

    // 사용자 조회(패스워드는 제외됨)
    var user = await this.usersService.findById(token, data._id);

    // 사용자 조회(패스워드까지 포함)
    const userInfo: UserInfo = {
      id: user.email,
      pwd: data.PWD,
    };
    user = await this.usersService.findByUserInfoForAuth(userInfo);
    if (user) return true;
    else return false;
  }

  async findMyInfo(token: AuthTokenInfo): Promise<SignUpInfo> {
    const user = await this.usersService.findById(token, token.uID);
    if (!user) throw new UnauthorizedException();

    const company = await this.companiesService.findById(token, token.cID);
    if (!company) throw new UnauthorizedException();

    const myInfo: SignUpInfo = {
      company,
      user,
    };

    return myInfo;
  }

  async updateUserPassword(
    token: AuthTokenInfo,
    id: string,
    data: HelpChangePWD,
  ): Promise<boolean> {
    if (token.uID != id || token.uID != data._id)
      throw new UnauthorizedException();

    // 사용자 조회(패스워드는 제외됨)
    var user = await this.usersService.findById(token, data._id);

    // 사용자 조회(패스워드까지 포함)
    const userInfo: UserInfo = {
      id: user.email,
      pwd: data.oldPWD,
    };
    user = await this.usersService.findByUserInfoForAuth(userInfo);
    if (!user) throw new UnauthorizedException();

    user = await this.usersService.findByIdAndUpdateForAuth(user._id, {
      password: data.newPWD,
    });
    if (user) return true;
    else return false;
  }

  async updateUserInfo(
    token: AuthTokenInfo,
    id: string,
    user: Partial<User>,
  ): Promise<User> {
    if (token.uID != id) throw new UnauthorizedException();
    const pUser: Partial<User> = {};
    if (user.name) pUser.name = user.name;
    if (user.hpNumber) pUser.hpNumber = user.hpNumber;
    if (user.address) pUser.address = user.address;
    if (user.joinDate) pUser.joinDate = user.joinDate;
    // 오너에 한해 approval 수정 승인
    if (token.uAuth == UserAuthority.OWNER && user.approval)
      pUser.approval = user.approval;
    return await this.usersService.findByIdAndUpdate(token, id, pUser);
  }

  async updateCompanyInfo(
    token: AuthTokenInfo,
    id: string,
    company: Partial<Company>,
  ): Promise<Company> {
    if (token.cID != id) throw new UnauthorizedException();
    var pUser: Partial<Company> = {};
    if (company.mbTypeNum) pUser.mbTypeNum = company.mbTypeNum;
    if (company.busType) pUser.busType = company.busType;
    if (company.busItem) pUser.busItem = company.busItem;
    if (company.phoneNum) pUser.phoneNum = company.phoneNum;
    if (company.faxNum) pUser.faxNum = company.faxNum;
    return await this.companiesService.findByIdAndUpdate(token, id, pUser);
  }

  async findWorksers(
    token: AuthTokenInfo,
    fParams: FindParameters,
  ): Promise<FindResult<User>> {
    fParams.filter = { auth: UserAuthority.WORKER } as Partial<User>;
    return await this.usersService.findByOptions(token, fParams);
  }
}
