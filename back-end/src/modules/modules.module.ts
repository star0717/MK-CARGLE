import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { AdminPartsModule } from './admin/parts/parts.module';
import { MaintenancesModule } from './maintenances/maintenances.module';
import { AgenciesModule } from './agencies/agencies.module';
import { PartssetsModule } from './partssets/partssets.module';
import { PartsModule } from './parts/parts.module';
import { CarsModule } from './cars/cars.module';
import { EstimatesModule } from './estimates/estimates.module';
import { StatementsModule } from './statements/statements.module';

@Module({
  imports: [
    CompaniesModule,
    UsersModule,
    SettingsModule,
    AdminPartsModule,
    MaintenancesModule,
    AgenciesModule,
    PartssetsModule,
    PartsModule,
    CarsModule,
    EstimatesModule,
    StatementsModule,
  ],
})
export class ModulesModule {}
