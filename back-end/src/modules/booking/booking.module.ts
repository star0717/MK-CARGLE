import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommonModule } from 'src/lib/common/common.module';
import { Booking } from 'src/models/booking.entity';
import { SetbookingModule } from '../setbooking/setbooking.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [
    TypegooseModule.forFeature([Booking]),
    CommonModule,
    SetbookingModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
