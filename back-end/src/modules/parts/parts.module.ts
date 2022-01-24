import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Part } from 'src/models/part.entity';

@Module({
  imports: [TypegooseModule.forFeature([Part])],
  controllers: [PartsController],
  providers: [PartsService],
})
export class PartsModule {}
