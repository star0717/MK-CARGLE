import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { FindResult } from 'src/models/base.entity';
import { Part } from 'src/models/part.entity';

@Injectable()
export class PartsService {
  private allParts: FindResult<Part>;

  constructor(
    @InjectModel(Part)
    readonly model: ReturnModelType<typeof Part>,
  ) {
    this.prepareAllParts();
  }

  async prepareAllParts() {
    const docs = await this.model.find().sort({ code: -1 });
    this.allParts = {
      currentPage: 1,
      lastPage: 1,
      docs,
      totalDocs: docs.length,
    };
  }

  async findAllParts(): Promise<FindResult<Part>> {
    return this.allParts;
  }
}
