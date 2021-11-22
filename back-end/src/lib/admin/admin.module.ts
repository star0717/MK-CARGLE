import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/models/user.entity';
import { Company } from 'src/models/company.entity';
import { CommonModule } from '../common/common.module';
import { CompaniesModule } from 'src/modules/companies/companies.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    TypegooseModule.forFeature([User, Company]),
    CommonModule,
    CompaniesModule,
    UsersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
