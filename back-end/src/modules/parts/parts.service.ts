import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { FindResult } from 'src/models/base.entity';
import { Part } from 'src/models/part.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectModel(Part)
    readonly model: ReturnModelType<typeof Part>,
    readonly commonService: CommonService,
  ) {
    this.prepareAllParts();
  }

  async prepareAllParts() {
    const docs = await this.model.find().sort({ code: -1 });
    const allParts: FindResult<Part> = {
      currentPage: 1,
      lastPage: 1,
      docs,
      totalDocs: docs.length,
    };
    this.commonService.setAllParts(allParts);
  }

  async findAllParts(): Promise<FindResult<Part>> {
    return this.commonService.getAllParts();
  }
}
