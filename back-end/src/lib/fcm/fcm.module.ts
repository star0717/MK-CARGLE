import { CommonModule } from './../common/common.module';
import { Module } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FcmController } from './fcm.controller';

@Module({
  controllers: [FcmController],
  providers: [FcmService],
})
export class FcmModule {}
