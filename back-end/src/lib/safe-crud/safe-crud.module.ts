import { Module } from '@nestjs/common';
import config from 'src/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] }), CommonModule],
})
export class SafeCrudModule {}
