import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { BaseService } from 'src/lib/base-crud/base-crud.service';
import { Company } from 'src/models/company.entity';

@Injectable()
export class CompaniesService extends BaseService<Company> {
    constructor(@InjectModel(Company) readonly model: ReturnModelType<typeof Company>) {
        super(model);
    }

    async findCompanyByComRegNum(comRegNum: string): Promise<Company> {
        return await this.model.findOne({ comRegNum });
    }
}
