import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import {
  getStartOfDayDateTime as getStartOfDayDateTime,
  getStrDate,
} from 'src/constants/back-end.toolkit';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { FindResult } from 'src/models/base.entity';
import { Maintenance } from 'src/models/maintenance.entity';
import { Part } from 'src/models/part.entity';
import { PartsService } from '../admin/parts/parts.service';

@Injectable()
export class MaintenancesService extends SafeService<Maintenance> {
  private allParts: FindResult<Part>;

  constructor(
    @InjectModel(Maintenance)
    readonly model: ReturnModelType<typeof Maintenance>,
    readonly commonService: CommonService,
    readonly partsService: PartsService,
  ) {
    super(model, commonService);
    this.prepareAllParts();
    this.genDocNumber();
  }

  async prepareAllParts() {
    this.allParts = await this.partsService.findAllPart();
    console.log('AllParts.length: ' + this.allParts.totalDocs);
  }

  async findAllParts(): Promise<FindResult<Part>> {
    return this.allParts;
  }

  /**
   * 오늘 생성된 문서 수 반환
   * @returns 오늘 생성된 문서의 수
   */
  private async numOfDocsToday(): Promise<number> {
    return await this.model.countDocuments({
      createdAt: {
        $gte: getStartOfDayDateTime(),
      },
    });
  }

  /**
   * 문서번호를 생성하여 반환
   * @returns 생성된 문서번호
   */
  private async genDocNumber(): Promise<string> {
    const index = await this.numOfDocsToday();
    const docNum = `${getStrDate()}${(index + 1).toString().padStart(7, '0')}`;

    console.log(docNum);

    return docNum;
  }
}
