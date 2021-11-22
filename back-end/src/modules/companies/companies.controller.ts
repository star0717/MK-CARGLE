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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { DeleteResult } from 'src/models/base.entity';
import { Company } from 'src/models/company.entity';
import { CompaniesService } from './companies.service';

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
  async create(@Req() req, @Res() Res, @Body() doc: Company): Promise<Company> {
    throw new NotAcceptableException();
  }

  @Patch(':id')
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async findByIdAndUpdate(
    @Req() req,
    @Res() Res,
    @Param('id') id: string,
    @Body() doc: Partial<Company>,
  ): Promise<Company> {
    throw new NotAcceptableException();
  }

  @Delete(':id')
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async findByIdAndRemove(
    @Req() req,
    @Res() Res,
    @Param('id') id: string,
  ): Promise<DeleteResult> {
    throw new NotAcceptableException();
  }
}
