import { Injectable, Type } from "@nestjs/common";
import { Model } from 'mongoose';
import { BaseEntity, DeleteResult, PaginateOptions, PaginateResult } from "src/models/base.entity";

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

  constructor(
    readonly model: Model<T>
  ) { };

  async create(doc: T): Promise<T> {

    // 더미 데이터 생성용
    // for (var i = 0; i < 1000; i++) {
    //     doc["name"] = "cb park" + i;
    //     doc["createdAt"] = new Date(+Date.now());
    //     var newDoc = await this.model.create(doc);
    // }
    // return newDoc;


    // doc.createdAt = new Date(Date.now());
    console.log("service => db");
    console.log(doc);

    doc.createdAt = new Date(Date.now());
    const result = await this.model.create(doc);
    console.log("service <= db");
    console.log(result);
    return result;
  }

  async findByOptions(pOptions: PaginateOptions): Promise<PaginateResult<T>> {

    console.log(pOptions);
    console.log(pOptions.getQuery());
    let searchOption = {};
    if (pOptions.searchField && pOptions.searchKeyword) {
      if (pOptions.useRegSearch === true) {
        searchOption[pOptions.searchField] = { $regex: pOptions.searchKeyword, $options: '$i' };
      } else {
        searchOption[pOptions.searchField] = pOptions.searchKeyword;
      }
    }
    const currentPage = pOptions.page;
    const skipOption = (currentPage - 1) * (pOptions.take);
    const limitOption = (pOptions.take);

    let pr: PaginateResult<T> = new PaginateResult<T>();
    pr.totalDocs = await this.model.countDocuments(searchOption);
    pr.currentPage = pOptions.page;
    pr.lastPage = Math.ceil(pr.totalDocs / limitOption);
    pr.docs = await this.model.find(searchOption).skip(skipOption).limit(limitOption);

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