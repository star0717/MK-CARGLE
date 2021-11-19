import { Module } from '@nestjs/common';
import { Companies2Service } from './companies2.service';
import { Companies2Controller } from './companies2.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Company } from 'src/models/company.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([Company]),
  ],
  controllers: [Companies2Controller],
  providers: [Companies2Service],
  exports: [Companies2Service]
})
export class Companies2Module { }
