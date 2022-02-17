import { Module } from '@nestjs/common';
import { StatementsService } from './statements.service';
import { StatementsController } from './statements.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Statement } from 'src/models/statement.entity';
import { CommonModule } from 'src/lib/common/common.module';

@Module({
  imports: [TypegooseModule.forFeature([Statement]), CommonModule],
  controllers: [StatementsController],
  providers: [StatementsService],
  exports: [StatementsService],
})
export class StatementsModule {}
