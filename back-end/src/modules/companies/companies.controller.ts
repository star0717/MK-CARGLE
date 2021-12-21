import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import {
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { Company } from 'src/models/company.entity';
import { CompaniesService } from './companies.service';
import { AuthToken } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';

@Controller('companies')
@ApiTags('업체(Company) API')
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
  @ApiOperation({
    summary: `[DISABLED]`,
  })
  async create(
    @Body() doc: Company,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Company> {
    throw new NotAcceptableException();
  }

  @Get()
  @ApiOperation({
    summary: `[DISABLED]`,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<FindResult<Company>> {
    throw new NotAcceptableException();
  }

  @Patch(':id')
  @ApiOperation({
    summary: `[DISABLED]`,
  })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() doc: Company,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Company> {
    throw new NotAcceptableException();
  }

  @Delete(':id')
  @ApiOperation({
    summary: `[DISABLED]`,
  })
  async findByIdAndRemove(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    throw new NotAcceptableException();
  }
}
