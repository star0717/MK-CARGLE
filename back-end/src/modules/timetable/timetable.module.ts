import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { TimeTable } from 'src/models/timetable.entity';
import { CommonModule } from 'src/lib/common/common.module';

@Module({
  imports: [TypegooseModule.forFeature([TimeTable]), CommonModule],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}
