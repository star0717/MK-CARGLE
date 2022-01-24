import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { PartsModule } from './admin/parts/parts.module';
import { MaintenancesModule } from './maintenances/maintenances.module';
import { AgenciesModule } from './agencies/agencies.module';

@Module({
  imports: [CompaniesModule, UsersModule, SettingsModule, PartsModule, MaintenancesModule, AgenciesModule],
})
export class ModulesModule {}
