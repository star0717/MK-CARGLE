import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  BaseEntity,
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';

/* 확장 서비스 클래스용 패키지 - 아래의 내용을 확장 클래스에 주입
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
*/

@Injectable()
export class BaseService<T extends BaseEntity> {
  /* 자식 서비스 클래스용 생성자 - 아래의 내용을 자식 클래스에 삽입
  constructor(@InjectModel(EntityClass) readonly model: ReturnModelType<typeof EntityClass>) {
      super(model);
  }
  */
  private modelKeys: string[];

  constructor(readonly model: Model<T>) {
    const schema = model.prototype.schema.paths;
    this.modelKeys = Object.keys(schema);
  }

  /**
   * 데이터 모델 클래스에 해당 key 필드가 존재하는지 유무 반환
   * @param key 검색할 key
   * @returns 존재 유무
   */
  isContainedKey(key: string): boolean {
    return this.modelKeys.includes(key);
  }

  async create(doc: T): Promise<T> {
    doc.createdAt = new Date(Date.now());
    return await this.model.create(doc);
  }

  async findByOptions(pOptions: FindParameters): Promise<FindResult<T>> {
    console.log('in service');
    console.log(pOptions);

    let searchOption = {};
    if (pOptions.filterKey && pOptions.filterValue) {
      if (!this.isContainedKey(pOptions.filterKey)) {
        throw new BadRequestException();
      }

      if (pOptions.useRegSearch === true) {
        searchOption[pOptions.filterKey] = {
          $regex: pOptions.filterValue,
          $options: '$i',
        };
      } else {
        searchOption[pOptions.filterKey] = pOptions.filterValue;
      }
    }
    console.log(searchOption);
    const currentPage = pOptions.page;
    const skipOption = (currentPage - 1) * pOptions.take;
    const limitOption = pOptions.take;

    let pr: FindResult<T> = new FindResult<T>();
    pr.totalDocs = await this.model.countDocuments(searchOption);
    pr.currentPage = pOptions.page;
    pr.lastPage = Math.ceil(pr.totalDocs / limitOption);
    pr.docs = await this.model
      .find(searchOption)
      .skip(skipOption)
      .limit(limitOption);

    return pr;
  }

  async findById(id: string): Promise<T> {
    return await this.model.findById(id);
  }

  async update(id: string, doc: Partial<T>): Promise<T> {
    // 변경되면 안되는 필드 데이터 삭제
    delete doc._id;
    delete doc.createdAt;
    // 갱신 시점 주입
    doc.updatedAt = new Date(Date.now());

    return await this.model.findByIdAndUpdate(id, doc as any, { new: true });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.model.findById(id).deleteOne();
  }
}
