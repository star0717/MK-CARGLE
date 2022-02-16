import { CommonModule } from './../../lib/common/common.module';
import { Module } from '@nestjs/common';
import { EstimatesService } from './estimates.service';
import { EstimatesController } from './estimates.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Estimate } from 'src/models/estimate.entity';

@Module({
  imports: [TypegooseModule.forFeature([Estimate]), CommonModule],
  controllers: [EstimatesController],
  providers: [EstimatesService],
  exports: [EstimatesService],
})
export class EstimatesModule {}
