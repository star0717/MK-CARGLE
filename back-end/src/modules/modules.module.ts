import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [CompaniesModule, UsersModule, SettingsModule, FilesModule],
})
export class ModulesModule {}
