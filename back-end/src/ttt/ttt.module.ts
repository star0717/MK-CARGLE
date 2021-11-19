import { Module } from '@nestjs/common';
import { TttService } from './ttt.service';
import { TttController } from './ttt.controller';

@Module({
  controllers: [TttController],
  providers: [TttService]
})
export class TttModule {}
