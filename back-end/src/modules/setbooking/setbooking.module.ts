import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommonModule } from 'src/lib/common/common.module';
import { SetBooking } from 'src/models/setbooking.entity';
import { BookingModule } from 'src/modules/booking/booking.module';
import { TimetableModule } from 'src/modules/timetable/timetable.module';
import { SetbookingController } from './setbooking.controller';
import { SetbookingService } from './setbooking.service';

@Module({
  imports: [
    TypegooseModule.forFeature([SetBooking]),
    CommonModule,
    BookingModule,
    TimetableModule,
  ],
  controllers: [SetbookingController],
  providers: [SetbookingService],
  exports: [SetbookingService],
})
export class SetbookingModule {}
