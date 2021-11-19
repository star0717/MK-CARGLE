import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { AnimalsModule } from './animals/animals.module';
import { Companies2Module } from './companies2/companies2.module';
import { Users2Module } from './users2/users2.module';

@Module({
  imports: [UsersModule, CompaniesModule, AnimalsModule, Companies2Module, Users2Module]
})
export class ModulesModule { }
