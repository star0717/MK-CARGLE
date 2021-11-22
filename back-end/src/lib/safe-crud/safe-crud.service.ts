import { BadRequestException, Injectable, Req, Res } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { Request, Response } from 'express';
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  BaseEntity,
  DeleteResult,
  PaginateOptions,
  PaginateResult,
} from 'src/models/base.entity';
import { UserAuthority } from 'src/models/user.entity';
import { CommonService } from '../common/common.service';

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

  extractToken(@Req() req, @Res() res: Response): AuthTokenInfo {
    return this.commonService.extractToken(req, res);
  }

  protected async _create(doc: T): Promise<T> {
    // 생성일 주입
    doc.createdAt = new Date(Date.now());

    return await this.model.create(doc);
  }

  async create(aToken: AuthTokenInfo, doc: T): Promise<T> {
    // ID값 주입
    doc._cID = aToken.cID;
    doc._uID = aToken.uID;

    return await this._create(doc);
  }

  async findByOptions(
    aToken: AuthTokenInfo,
    pOptions: PaginateOptions,
  ): Promise<PaginateResult<T>> {
    let searchOption: FilterQuery<BaseEntity> = {};
    if (pOptions.searchField && pOptions.searchKeyword) {
      if (!this.isContainedKey(pOptions.searchField)) {
        throw new BadRequestException();
      }

      if (pOptions.useRegSearch === true) {
        searchOption[pOptions.searchField] = {
          $regex: pOptions.searchKeyword,
          $options: '$i',
        };
      } else {
        searchOption[pOptions.searchField] = pOptions.searchKeyword;
      }

      // 검색 범위 제한
      if (aToken.uAuth != UserAuthority.ADMIN) {
        searchOption['_cID'] = aToken.cID;
      }
    }
    console.log('*** findByOptions');
    console.log(searchOption);
    const currentPage = pOptions.page;
    const skipOption = (currentPage - 1) * pOptions.take;
    const limitOption = pOptions.take;

    let result: PaginateResult<T> = new PaginateResult<T>();
    result.totalDocs = await this.model.countDocuments(
      searchOption as FilterQuery<T>,
    );
    result.currentPage = pOptions.page;
    result.lastPage = Math.ceil(result.totalDocs / limitOption);
    result.docs = await this.model
      .find(searchOption as FilterQuery<T>)
      .skip(skipOption)
      .limit(limitOption);

    return result;
  }

  protected async _findById(id: string): Promise<T> {
    return await this.model.findById(id);
  }

  async findById(aToken: AuthTokenInfo, id: string): Promise<T> {
    let sOption: FilterQuery<BaseEntity> = { _id: id };
    if (aToken.uAuth != UserAuthority.ADMIN) {
      sOption._cID = aToken.cID;
    }
    return await this.model.findOne(sOption as FilterQuery<T>);
  }

  protected async _findByIdAndUpdate(id: string, doc: Partial<T>): Promise<T> {
    return await this.model.findByIdAndUpdate(id, doc as any, { new: true });
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

    return await this.model.findOneAndUpdate(
      fQuery as FilterQuery<T>,
      doc as any,
      { new: true },
    );
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
}
