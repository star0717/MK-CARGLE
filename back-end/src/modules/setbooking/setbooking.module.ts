import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommonModule } from 'src/lib/common/common.module';
import { SetBooking } from 'src/models/setbooking.entity';
import { SetbookingController } from './setbooking.controller';
import { SetbookingService } from './setbooking.service';

@Module({
  imports: [TypegooseModule.forFeature([SetBooking]), CommonModule],
  controllers: [SetbookingController],
  providers: [SetbookingService],
  exports: [SetbookingService],
})
export class SetbookingModule {}
