import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Car } from 'src/models/car.entity';
import { CommonModule } from 'src/lib/common/common.module';

@Module({
  imports: [TypegooseModule.forFeature([Car]), CommonModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
