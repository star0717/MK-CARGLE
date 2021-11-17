import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Animal } from 'src/models/animal.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([Animal]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService]
})
export class AnimalsModule { }
