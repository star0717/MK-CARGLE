import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Model, FilterQuery, ObjectId } from 'mongoose';
import { AuthTokenInfo } from "src/models/auth.entity";
import { BaseEntity, DeleteResult, PaginateOptions, PaginateResult } from "src/models/base.entity";
import { CompanyApproval } from "src/models/company.entity";
import { UserAuthority } from "src/models/user.entity";

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

    constructor(
        readonly model: Model<T>,
    ) {
        const schema = model.prototype.schema.paths;
        this.modelKeys = Object.keys(schema);
    };

    /**
     * 데이터 모델 클래스에 해당 key 필드가 존재하는지 유무 반환
     * @param key 검색할 key
     * @returns 존재 유무
     */
    isContainedKey(key: string): boolean {
        return this.modelKeys.includes(key);
    }

    async create(aToken: AuthTokenInfo, doc: T): Promise<T> {

        // ID값 주입
        doc._cID = aToken.cID;
        doc._uID = aToken.uID;

        // 생성일 주입
        doc.createdAt = new Date(Date.now());

        return await this.model.create(doc);
    }

    async findByOptions(aToken: AuthTokenInfo, pOptions: PaginateOptions): Promise<PaginateResult<T>> {
        let searchOption: FilterQuery<BaseEntity> = {};
        if (pOptions.searchField && pOptions.searchKeyword) {

            if (!this.isContainedKey(pOptions.searchField)) {
                throw new BadRequestException();
            }

            if (pOptions.useRegSearch === true) {
                searchOption[pOptions.searchField] = { $regex: pOptions.searchKeyword, $options: '$i' };
            } else {
                searchOption[pOptions.searchField] = pOptions.searchKeyword;
            }

            // 검색 범위 제한
            if (aToken.uAuth != UserAuthority.ADMIN) {
                searchOption["_cID"] = aToken.cID;
            }
        }
        console.log("*** findByOptions");
        console.log(searchOption);
        const currentPage = pOptions.page;
        const skipOption = (currentPage - 1) * (pOptions.take);
        const limitOption = (pOptions.take);

        let result: PaginateResult<T> = new PaginateResult<T>();
        result.totalDocs = await this.model.countDocuments(searchOption as FilterQuery<T>);
        result.currentPage = pOptions.page;
        result.lastPage = Math.ceil(result.totalDocs / limitOption);
        result.docs = await this.model.find(searchOption as FilterQuery<T>).skip(skipOption).limit(limitOption);

        return result;
    }

    async findById(aToken: AuthTokenInfo, id: string): Promise<T> {

        let sOption: FilterQuery<BaseEntity> = { _id: id };
        if (aToken.uAuth != UserAuthority.ADMIN) {
            sOption._cID = aToken.cID;
        }

        return await this.model.findOne(sOption as FilterQuery<T>);
    }

    async update(aToken: AuthTokenInfo, id: string, doc: Partial<T>): Promise<T> {

        // 갱신 시점 주입
        doc.updatedAt = new Date(Date.now());

        let sOption: FilterQuery<BaseEntity> = { _id: id };
        if (aToken.uAuth != UserAuthority.ADMIN) {
            sOption._cID = aToken.cID;
        }

        return await this.model.findOneAndUpdate(sOption as FilterQuery<T>, doc as any, { new: true });
    }

    async remove(aToken: AuthTokenInfo, id: string): Promise<DeleteResult> {

        let sOption: FilterQuery<BaseEntity> = { _id: id };
        if (aToken.uAuth != UserAuthority.ADMIN) {
            sOption._cID = aToken.cID;
        }

        return await this.model.findOne(sOption as FilterQuery<T>).deleteOne();
    }
}