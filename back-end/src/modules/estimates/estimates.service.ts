import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimatesService {
  remove(id: number) {
    return `This action removes a #${id} estimate`;
  }
}
