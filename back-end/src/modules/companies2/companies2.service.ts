import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Company } from 'src/models/company.entity';

@Injectable()
export class Companies2Service extends SafeService<Company> {
  constructor(
    @InjectModel(Company) readonly model: ReturnModelType<typeof Company>,
  ) {
    super(model);
  }

  async createForAuth(company: Company): Promise<Company> {
    return await this._create(company);
  }

  async findByIdForAuth(id: string) {
    return await this._findById(id);
  }

  async findByIdAndUpdateForAuth(
    id: string,
    doc: Partial<Company>,
  ): Promise<Company> {
    return await this._findByIdAndUpdate(id, doc);
  }

  async findByIdAndRemoveForAuth(id: string) {
    return await this._findByIdAndRemove(id);
  }

  async findByComRegNumForAuth(comRegNum: string): Promise<Company> {
    return await this.model.findOne(
      { comRegNum },
      'name comRegNum ownerName address',
    );
  }

  async findByNameForAuth(name: string): Promise<Company[]> {
    return await this.model.find(
      { name: { $regex: name, $options: '$i' } },
      'name comRegNum ownerName address',
    );
  }
}
