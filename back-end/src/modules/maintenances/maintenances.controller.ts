import { getStrMainStatus } from './../../constants/maintenance.const';
import { FindParameters, DeleteResult } from 'src/models/base.entity';
import { FindResult } from 'src/models/base.entity';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { AuthToken } from 'src/lib/decorators/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Maintenance } from 'src/models/maintenance.entity';
import { MaintenancesService } from './maintenances.service';
import {
  getStrMainCustomerType,
  mainStatusList,
  mainCustomerTypeList,
} from 'src/constants/maintenance.const';

@Controller('maintenances')
@ApiTags('정비내역 API')
export class MaintenancesController {
  constructor(private readonly service: MaintenancesService) {}

  @Post()
  @ApiOperation({ summary: `[WORKER] 새로운 Maintenance 데이터 추가` })
  @ApiBody({ description: `추가할 Maintenance 데이터`, type: Maintenance })
  @ApiCreatedResponse({
    description: `추가된 Maintenance 데이터`,
    type: Maintenance,
  })
  async create(
    @Body() doc: Maintenance,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    console.log(doc);
    return await this.service.create(token, doc);
  }

  @Get()
  @ApiOperation({
    summary: `[WORKER] 조건에 해당하는 Maintenance 배열 데이터를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 Maintenance 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<FindResult<Maintenance>> {
    return await this.service.findByOptions(token, fParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 Maintenance 데이터 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 Maintenance 데이터`,
    type: Maintenance,
  })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    return await this.service.findById(token, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 Maintenance 데이터 갱신`,
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiBody({ description: `갱신된 Maintenance 데이터`, type: Maintenance })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() doc: Maintenance,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    console.log('update in BaseController');
    console.log(doc);
    return await this.service.findByIdAndUpdate(token, id, doc);
  }

  @Delete(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 Maintenance 데이터 삭제`,
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiResponse({
    description: `삭제된 Maintenance 데이터의 수`,
    type: DeleteResult,
  })
  async findByIdAndRemove(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    return await this.service.findByIdAndRemove(token, id);
  }

  /***** 공통 기능 *****
   * 1 정비이력 조회(리스트)
   * 2 정비이력 중간 저장
   * 3 견적서 발급
   *  - 차량입고 처리 이후부터 사용가능
   */

  /***** 정비 장부 동작 절차 *****
   *
   * 1 정비 이력 조회
   * 2 차량 정보 조회(차량번호 입력)
   * 3 차량 입고
   *  - 정비이력 저장(차량정보, 입고일, 상태변경)
   * 4 정비 진행(정비 시작)
   * - 정비이력 저장(정비내역, 정비시작일, 상태변경)
   * 4 정비완료
   * - 정비이력 저장(정비완료일, 상태변경)
   * 5 국토부 정비이력 전송
   * 6 결제 정보 입력
   * 7 서류발급
   * 8 출고처리
   *  - 정비이력 저장(상태변경)
   */
}
