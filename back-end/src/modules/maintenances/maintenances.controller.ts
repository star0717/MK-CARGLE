import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';

@Controller('maintenances')
export class MaintenancesController {
  constructor(private readonly service: MaintenancesService) {}
}
