import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { Company } from 'src/models/company.entity';
import { Companies2Service } from './companies2.service';


@Controller('companies2')
@ApiTags("사업자 API v2")
export class Companies2Controller extends SafeControllerFactory<Company>(Company) {
  constructor(private readonly companiesService: Companies2Service) {
    super(companiesService);
  }


}
