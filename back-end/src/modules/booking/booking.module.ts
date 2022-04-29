import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommonModule } from 'src/lib/common/common.module';
import { Booking } from 'src/models/booking.entity';
import { CarsModule } from 'src/modules/cars/cars.module';
import { TimetableModule } from 'src/modules/timetable/timetable.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [
    TypegooseModule.forFeature([Booking]),
    CommonModule,
    CarsModule,
    TimetableModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
