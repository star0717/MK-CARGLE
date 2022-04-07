import { TypegooseModule } from 'nestjs-typegoose';
import { CommonModule } from 'src/lib/common/common.module';
import { Module } from '@nestjs/common';
import { SetBookingService } from './set-booking.service';
import { SetBookingController } from './set-booking.controller';
import { SetBooking } from 'src/models/booking.entity';

@Module({
  imports: [TypegooseModule.forFeature([SetBooking]), CommonModule],
  controllers: [SetBookingController],
  providers: [SetBookingService],
})
export class SetBookingModule {}
