import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Animal } from 'src/models/animal.entity';

@Injectable()
export class AnimalsService extends SafeService<Animal>{
  constructor(
    @InjectModel(Animal) readonly model: ReturnModelType<typeof Animal>,
  ) {
    super(model);
  }
}
