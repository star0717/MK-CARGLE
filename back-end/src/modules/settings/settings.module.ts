import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { CommonModule } from 'src/lib/common/common.module';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [CommonModule, UsersModule, CompaniesModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
