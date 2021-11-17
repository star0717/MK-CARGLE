import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [UsersModule, CompaniesModule, AnimalsModule]
})
export class ModulesModule { }
