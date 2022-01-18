import { Module } from '@nestjs/common';
import { PartsService } from './parts/parts.service';

@Module({
  exports: [PartsService],
})
export class CompaniesModule {}
