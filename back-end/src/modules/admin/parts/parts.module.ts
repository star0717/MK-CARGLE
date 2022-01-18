import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Part } from 'src/models/part.entity';
import { CommonModule } from 'src/lib/common/common.module';

@Module({
  imports: [TypegooseModule.forFeature([Part]), CommonModule],
  controllers: [PartsController],
  providers: [PartsService],
  exports: [PartsService],
})
export class PartsModule {}
