import { Module } from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesController } from './maintenances.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Maintenance } from 'src/models/maintenance.entity';
import { CommonModule } from 'src/lib/common/common.module';
import { PartsService } from 'src/modules/admin/parts/parts.service';

@Module({
  imports: [
    TypegooseModule.forFeature([Maintenance]),
    CommonModule,
    // PartsService,
  ],
  controllers: [MaintenancesController],
  providers: [MaintenancesService],
})
export class MaintenancesModule {}
