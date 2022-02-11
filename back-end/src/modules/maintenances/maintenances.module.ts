import { Module } from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesController } from './maintenances.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Maintenance } from 'src/models/maintenance.entity';
import { CommonModule } from 'src/lib/common/common.module';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    TypegooseModule.forFeature([Maintenance]),
    CommonModule,
    CarsModule,
  ],
  controllers: [MaintenancesController],
  providers: [MaintenancesService],
})
export class MaintenancesModule {}
