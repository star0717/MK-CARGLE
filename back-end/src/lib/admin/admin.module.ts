import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/models/user.entity';
import { Company } from 'src/models/company.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([User, Company]),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
