import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { Maintenance } from 'src/models/maintenance.entity';
import { MaintenancesService } from './maintenances.service';

@Controller('maintenances')
@ApiTags('정비내역 API')
export class MaintenancesController extends SafeControllerFactory<Maintenance>(
  Maintenance,
) {
  constructor(private readonly service: MaintenancesService) {
    super(service);
  }
}
