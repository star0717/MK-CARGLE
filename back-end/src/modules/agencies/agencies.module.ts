import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Agency } from 'src/models/agency.entity';
import { CommonModule } from 'src/lib/common/common.module';

@Module({
  imports: [TypegooseModule.forFeature([Agency]), CommonModule],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
