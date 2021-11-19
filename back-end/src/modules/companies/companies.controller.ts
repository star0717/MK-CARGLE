import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
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
}
