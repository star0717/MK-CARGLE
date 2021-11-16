import { Injectable } from '@nestjs/common';
import { ReturnModelType, getClass } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { BaseService } from 'src/lib/base-crud/base-crud.service';
import { Company } from 'src/models/company.entity';

@Injectable()
export class CompaniesService extends BaseService<Company> {
    constructor(
        @InjectModel(Company) readonly model: ReturnModelType<typeof Company>,
    ) {
        super(model);
    }

    /**
     * 사업자 번호에 해당하는 사업자 정보 반환
     * @param comRegNum 조회할 사업자 번호
     * @returns 사업자 정보
     */
    async findCompanyByComRegNum(comRegNum: string): Promise<Company> {
        return await this.model.findOne({ comRegNum });
    }

    /**
     * 사업자 이름에 해당하는 사업자 정보 반환
     * @param name 조회할 사업자 이름
     * @returns 사업자 정보 배열
     */
    async findCompaniesByName(name: string): Promise<Company[]> {
        return await this.model.find({ name: { $regex: name, $options: '$i' } });
    }
}
