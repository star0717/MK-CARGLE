import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseControllerFactory } from 'src/lib/base-crud/base-crud.controller';
import { Company } from 'src/models/company.entity';
import { CompaniesService } from './companies.service';


@Controller('companies')
@ApiTags("사업자 API")
export class CompaniesController extends BaseControllerFactory<Company>(Company) {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService)
  }
}
