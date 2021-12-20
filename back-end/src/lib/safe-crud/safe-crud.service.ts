import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { Request, Response } from 'express';
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  BaseEntity,
  DeleteResult,
  FindParameters,
  FindResult,
  DbErrorInfo,
} from 'src/models/base.entity';
import { UserAuthority } from 'src/models/user.entity';
import { CommonService } from '../common/common.service';
import { MongoError, MongoServerError } from 'mongoose/node_modules/mongodb';

/* 확장 서비스 클래스용 패키지 - 아래의 내용을 확장 클래스에 주입
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
*/

@Injectable()
export class SafeService<T extends BaseEntity> {
  /* 자식 서비스 클래스용 생성자 - 아래의 내용을 자식 클래스에 삽입
    constructor(@InjectModel(EntityClass) readonly model: ReturnModelType<typeof EntityClass>) {
        super(model);
    }
    */
  private modelKeys: string[];

  constructor(readonly model: Model<T>, readonly commonService: CommonService) {
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

  protected async _create(doc: T): Promise<T> {
    // 생성일 주입
    doc.createdAt = new Date(Date.now());

    try {
      return await this.model.create(doc);
    } catch (err: unknown) {
      this.handelError(err);
    }
  }

  async create(token: AuthTokenInfo, doc: T): Promise<T> {
    // ID값 주입
    doc._cID = token.cID;
    doc._uID = token.uID;

    return await this._create(doc);
  }

  async findByOptions(
    token: AuthTokenInfo,
    fParams: FindParameters,
  ): Promise<FindResult<T>> {
    var fQuery: FilterQuery<BaseEntity> = {};
    if (fParams.filterKey && fParams.filterValue) {
      if (!this.isContainedKey(fParams.filterKey)) {
        throw new BadRequestException();
      }

      if (fParams.useRegSearch === true) {
        fQuery[fParams.filterKey] = {
          $regex: fParams.filterValue,
          $options: '$i',
        };
      } else {
        fQuery[fParams.filterKey] = fParams.filterValue;
      }
    }
    // 검색 범위 제한
    if (token.uAuth != UserAuthority.ADMIN) {
      fQuery._cID = token.cID;
    }

    if (fParams.filter) {
      fQuery = {
        ...fQuery,
        ...fParams.filter,
      };
    }

    console.log('*** findByOptions');
    console.log(fQuery);
    const currentPage = fParams.page;
    const skipOption = (currentPage - 1) * fParams.take;
    const limitOption = fParams.take;

    let result: FindResult<T> = new FindResult<T>();
    result.totalDocs = await this.model.countDocuments(
      fQuery as FilterQuery<T>,
    );
    result.currentPage = fParams.page;
    result.lastPage = Math.ceil(result.totalDocs / limitOption);
    result.docs = await this.model
      .find(fQuery as FilterQuery<T>, fParams.projection)
      .skip(skipOption)
      .limit(limitOption);

    return result;
  }

  protected async _findById(id: string): Promise<T> {
    return await this.model.findById(id);
  }

  async findById(token: AuthTokenInfo, id: string): Promise<T> {
    let fQuery: FilterQuery<BaseEntity> = { _id: id };
    if (token.uAuth != UserAuthority.ADMIN) {
      fQuery._cID = token.cID;
    }
    return await this.model.findOne(fQuery as FilterQuery<T>);
  }

  protected async _findByIdAndUpdate(id: string, doc: Partial<T>): Promise<T> {
    try {
      return await this.model.findByIdAndUpdate(id, doc as any, { new: true });
    } catch (err: unknown) {
      this.handelError(err);
    }
  }

  async findByIdAndUpdate(
    token: AuthTokenInfo,
    id: string,
    doc: Partial<T>,
  ): Promise<T> {
    // 갱신 시점 주입
    doc.updatedAt = new Date(Date.now());

    var fQuery: FilterQuery<BaseEntity> = { _id: id };
    if (token.uAuth != UserAuthority.ADMIN) {
      fQuery._cID = token.cID;
    }

    try {
      return await this.model.findOneAndUpdate(
        fQuery as FilterQuery<T>,
        doc as any,
        { new: true },
      );
    } catch (err: unknown) {
      this.handelError(err);
    }
  }

  protected async _findByIdAndRemove(id: string) {
    return await this.model.findByIdAndRemove(id);
  }

  async findByIdAndRemove(
    token: AuthTokenInfo,
    id: string,
  ): Promise<DeleteResult> {
    let fQuery: FilterQuery<BaseEntity> = { _id: id };
    if (token.uAuth != UserAuthority.ADMIN) {
      fQuery._cID = token.cID;
    }
    return await this.model.findOne(fQuery as FilterQuery<T>).deleteOne();
  }

  protected async _deleteMany(
    token: AuthTokenInfo,
    doc: Partial<T>,
  ): Promise<DeleteResult> {
    if (token.uAuth != UserAuthority.ADMIN) {
      doc._cID = token.cID;
    }
    return await this.model.deleteMany(doc);
  }

  private handelError(err: any) {
    if (err.name == 'MongoServerError' && err.code == 11000) {
      const mse = err as MongoServerError;
      var info: DbErrorInfo = {
        name: err.name,
        code: mse.code,
        codeName: mse.codeName,
      };

      for (var i: number = 0; i < this.modelKeys.length; i++) {
        if (mse.message.includes(this.modelKeys[i])) {
          info.key = this.modelKeys[i];
          break;
        }
      }

      throw new HttpException(info, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
