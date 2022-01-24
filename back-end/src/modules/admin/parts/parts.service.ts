import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { FindResult } from 'src/models/base.entity';
import { Part } from 'src/models/part.entity';

@Injectable()
export class AdminPartsService extends SafeService<Part> {
  constructor(
    @InjectModel(Part) readonly model: ReturnModelType<typeof Part>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }

  async genPartCode(id: string): Promise<string> {
    const fQuery: FilterQuery<Part> = { label: id };
    const part: Part = await this.model.findOne(fQuery).sort({ code: -1 });

    let newPostfix = '1';
    if (part) {
      const currentPostfix = parseInt(part.code.substring(2));
      newPostfix = (currentPostfix + 1).toString();
    }
    // console.log('id: ', id, 'newPostfix: ', newPostfix);
    return `${id}${newPostfix.padStart(4, '0')}`;
  }

  async findAllPart(label?: string): Promise<FindResult<Part>> {
    let fQuery: FilterQuery<Part> = {};
    if (label) fQuery = { label };

    const docs = await this.model.find(fQuery).sort({ code: -1 });
    const result: FindResult<Part> = {
      currentPage: 1,
      lastPage: 1,
      docs,
      totalDocs: docs.length,
    };
    return result;
  }

  /**
   * tsCode를 제거했을 때 tsCode 필드를 uset함
   * @param id 해당 Part의 ID
   * @param key
   * @returns
   */
  async _upsetFieldTsCode(id: string) {
    return await this.model.findByIdAndUpdate(
      id,
      {
        $unset: {
          tsCode: '',
        },
      },
      { new: true },
    );
  }
}
