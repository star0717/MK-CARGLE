import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommonModule } from 'src/lib/common/common.module';
import { Booking } from 'src/models/booking.entity';

@Module({
  imports: [TypegooseModule.forFeature([Booking]), CommonModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
