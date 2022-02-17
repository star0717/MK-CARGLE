import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Statement } from 'src/models/statement.entity';

@Injectable()
export class StatementsService extends SafeService<Statement> {
  constructor(
    @InjectModel(Statement)
    readonly model: ReturnModelType<typeof Statement>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
    this._genDocNumber('명세서');
  }
}
