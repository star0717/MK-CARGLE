import { Module } from '@nestjs/common';
import { PartssetsService } from './partssets.service';
import { PartssetsController } from './partssets.controller';
import { PartsSet } from 'src/models/partsset.entity';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommonModule } from 'src/lib/common/common.module';

@Module({
  imports: [TypegooseModule.forFeature([PartsSet]), CommonModule],
  controllers: [PartssetsController],
  providers: [PartssetsService],
})
export class PartssetsModule {}
