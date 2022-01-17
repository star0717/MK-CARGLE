import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery, QueryWithHelpers } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Part } from 'src/models/part.entity';

@Injectable()
export class PartsService extends SafeService<Part> {
  constructor(
    @InjectModel(Part) readonly model: ReturnModelType<typeof Part>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }

  async genPartCode(token: AuthTokenInfo, id: string) {
    const fQuery: FilterQuery<Part> = { label: id };
    const part: Part = await this.model.findOne(fQuery).sort({ lable: 1 });

    let newPostfix = '1';
    if (part) {
      const currentPostfix = parseInt(part.code.substring(1));
      newPostfix = (currentPostfix + 1).toString();
    }
    return `${id}${newPostfix.padStart(4, '0')}`;
  }
}
