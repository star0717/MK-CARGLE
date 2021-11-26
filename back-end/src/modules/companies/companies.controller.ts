import {
  Body,
  Controller,
  Delete,
  NotAcceptableException,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { DeleteResult } from 'src/models/base.entity';
import { Company } from 'src/models/company.entity';
import { CompaniesService } from './companies.service';
import { AuthToken } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';

@Controller('companies')
@ApiTags('사업자 API')
export class CompaniesController extends SafeControllerFactory<Company>(
  Company,
) {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService);
  }

  /**
   * Safe-CRUD 오버라이딩
   */
  @Post()
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async create(
    @Body() doc: Company,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Company> {
    throw new NotAcceptableException();
  }

  @Patch(':id')
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() doc: Partial<Company>,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Company> {
    throw new NotAcceptableException();
  }

  @Delete(':id')
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async findByIdAndRemove(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    throw new NotAcceptableException();
  }
}
