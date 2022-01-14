import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { PartsModule } from './admin/parts/parts.module';

@Module({
  imports: [CompaniesModule, UsersModule, SettingsModule, PartsModule],
})
export class ModulesModule {}
