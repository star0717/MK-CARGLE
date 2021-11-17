import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';


@Controller('admin')
@ApiTags("관리자 API")
export class AdminController {
  constructor(private readonly service: AdminService) { }

  @Get('drop/users')
  @ApiOperation({ description: "사용자 컬렉션 삭제" })
  async dropUsers() {
    await this.service.dropUsers();
  }

  @Get('drop/companies')
  @ApiOperation({ description: "업체 컬렉션 삭제" })
  async dropCompanies() {
    await this.service.dropCompanies();
  }

  @Get('drop/all')
  @ApiOperation({ description: "전체 컬렉션 삭제" })
  async dropAll() {
    await this.service.dropUsers();
    await this.service.dropCompanies();
  }

  @Get('create/admin')
  @ApiOperation({ description: "어드민 계정 생성" })
  async createAdmin() {
    return await this.service.createAdmin();
  }


}
