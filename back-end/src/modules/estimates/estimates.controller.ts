import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstimatesService } from './estimates.service';

@Controller('estimates')
export class EstimatesController {
  constructor(private readonly service: EstimatesService) {}
}
