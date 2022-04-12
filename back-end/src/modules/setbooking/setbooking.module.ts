import { Module } from '@nestjs/common';
import { SetbookingService } from './setbooking.service';
import { SetbookingController } from './setbooking.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommonModule } from 'src/lib/common/common.module';
import { SetBooking } from 'src/models/setbooking.entity';

@Module({
  imports: [TypegooseModule.forFeature([SetBooking]), CommonModule],
  controllers: [SetbookingController],
  providers: [SetbookingService],
})
export class SetbookingModule {}
