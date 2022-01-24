import { Module } from '@nestjs/common';
import { AdminPartsService } from './parts.service';
import { AdminPartsController } from './parts.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Part } from 'src/models/part.entity';
import { CommonModule } from 'src/lib/common/common.module';

@Module({
  imports: [TypegooseModule.forFeature([Part]), CommonModule],
  controllers: [AdminPartsController],
  providers: [AdminPartsService],
  exports: [AdminPartsService],
})
export class AdminPartsModule {}
