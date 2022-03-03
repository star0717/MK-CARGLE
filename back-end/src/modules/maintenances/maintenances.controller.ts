import {
  MainFindOptions,
  MainPubDocInfo,
} from './../../models/maintenance.entity';
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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { MainCar, Maintenance } from 'src/models/maintenance.entity';
import { MaintenancesService } from './maintenances.service';
import {
  DeleteObjectIds,
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { Estimate } from 'src/models/estimate.entity';
import { Statement } from 'src/models/statement.entity';

@Controller('maintenances')
@ApiTags('정비내역 API')
export class MaintenancesController {
  constructor(private readonly service: MaintenancesService) {}

  @Get()
  @ApiOperation({
    summary: `[WORKER] 조건에 해당하는 Maintenance 배열 데이터를 페이징 정보와 함께 반환`,
  })
  // @ApiBody({ description: '추가 옵션', type: OptionalInfo })
  @ApiResponse({
    description: `검색된 Maintenance 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @Query() fOptions: MainFindOptions,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<FindResult<Maintenance>> {
    fParams.useDurationSearch = true;
    if (fOptions) {
      fParams.filter = fOptions;
      if (fOptions.regNumber) {
        fOptions['car.regNumber'] = fOptions.regNumber;
        delete fOptions.regNumber;
      }
    }

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

  @Post('/deletemany')
  @ApiOperation({
    summary: `[WORKER] 복수 오브젝트 ID에 해당하는 Maintenance의 데이터들을 삭제`,
  })
  @ApiBody({
    description: `삭제할 데이터들의 오브젝트ID들`,
    type: DeleteObjectIds,
  })
  @ApiResponse({
    description: `삭제된 Maintenance의 데이터의 수`,
    type: DeleteResult,
  })
  async deleteManyByIds(
    @AuthToken() token: AuthTokenInfo,
    @Body() objectIds: DeleteObjectIds,
  ): Promise<DeleteResult> {
    return this.service.deleteManyByIds(token, objectIds);
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
  @Get('carinfo/:id')
  @ApiOperation({ summary: '[WORKER] 차량정보 조회' })
  @ApiParam({ name: 'id', description: '차량번호' })
  @ApiResponse({ description: '검색된 차량 데이터' })
  async findCarByRegNumber(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<MainCar> {
    return await this.service.findCarByRegNumber(id);
  }

  @Post('store')
  @ApiOperation({
    summary: `[WORKER] 차량입고 처리. 새로운 Maintenance 데이터 추가`,
  })
  @ApiBody({
    description: `추가할 Maintenance 데이터. CarInfo 데이터만 포함`,
    type: Maintenance,
  })
  @ApiCreatedResponse({
    description: `추가된 Maintenance 데이터`,
    type: Maintenance,
  })
  async storeCar(
    @Body() doc: Maintenance,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    return await this.service.storeCar(token, doc);
  }

  @Patch('start/:id')
  @ApiOperation({
    summary: `[WORKER] 정비 시작. Maintenance 데이터 갱신`,
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiBody({
    description: `갱신할 Maintenance 데이터. works, workerName 데이터만 추가`,
    type: Maintenance,
  })
  @ApiCreatedResponse({
    description: `패치 된 Maintenance 데이터`,
    type: Maintenance,
  })
  async startMain(
    @Param('id') id: string,
    @Body() doc: Maintenance,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    return await this.service.startMain(token, id, doc);
  }

  @Patch('end/:id')
  @ApiOperation({
    summary: `[WORKER] 정비 완료. Maintenance 데이터 갱신`,
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiBody({
    description: `갱신할 Maintenance 데이터`,
    type: Maintenance,
  })
  @ApiCreatedResponse({
    description: `패치 된 Maintenance 데이터`,
    type: Maintenance,
  })
  async endMain(
    @Param('id') id: string,
    @Body() doc: Maintenance,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    return await this.service.endMain(token, id, doc);
  }

  @Patch('pay/:id')
  @ApiOperation({
    summary: `[WORKER] 결제. Maintenance 데이터 갱신`,
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiBody({
    description: `갱신할 Maintenance 데이터`,
    type: Maintenance,
  })
  @ApiCreatedResponse({
    description: `패치 된 Maintenance 데이터`,
    type: Maintenance,
  })
  async payMain(
    @Param('id') id: string,
    @Body() doc: Maintenance,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    return await this.service.payMain(token, id, doc);
  }

  @Patch('release/:id')
  @ApiOperation({
    summary: `[WORKER] 출고. Maintenance 데이터 갱신`,
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiBody({
    description: `갱신할 Maintenance 데이터`,
    type: Maintenance,
  })
  @ApiCreatedResponse({
    description: `패치 된 Maintenance 데이터`,
    type: Maintenance,
  })
  async releaseMain(
    @Param('id') id: string,
    @Body() doc: Maintenance,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    console.log(doc);
    return await this.service.releaseMain(token, id, doc);
  }

  @Patch('works/:id')
  @ApiOperation({
    summary:
      '[WORKER] 정비내역 임시저장. 정비 상태 변경 없이 수정중인 정비내역만 저장',
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiBody({
    description: `갱신할 Maintenance 데이터`,
    type: Maintenance,
  })
  @ApiCreatedResponse({
    description: `패치 된 Maintenance 데이터`,
    type: Maintenance,
  })
  async patchWorks(
    @Param('id') id: string,
    @Body() doc: Maintenance,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    return await this.service.patchWorks(token, id, doc);
  }

  /*********** 문서 발급 관련 *********************/
  // 견적서 관련
  @Get('gen/estimate/:id')
  @ApiOperation({
    summary: '[WORKER] 견적서 생성',
    description:
      '동일 정비이력에 대해서 견적서 생성은 여러번 발생될 수 있음.' +
      ' 기존 생성된 견적서의 발급 사실이 없을 경우에는 갱신되고' +
      ' 그 외의 경우에는 새롭게 생성됨',
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiCreatedResponse({
    description: `생성된 Estimate 데이터`,
    type: Estimate,
  })
  async genEstimate(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Estimate> {
    return await this.service.genEstimate(token, id);
  }

  @Patch('pub/estimate/:id')
  @ApiOperation({ summary: '[WORKER] 견적서 발급(프린트 or 온라인)' })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiBody({ description: 'd', type: MainPubDocInfo })
  @ApiCreatedResponse({
    description: `패치 된 Maintenance 데이터`,
    type: Estimate,
  })
  async pubEstimate(
    @Param('id') id: string,
    @Body() doc: MainPubDocInfo,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    return await this.service.pubEstimate(token, id, doc);
  }

  // 명세서 관련
  @Get('gen/statement/:id')
  @ApiOperation({
    summary: '[WORKER] 명세서 생성',
    description:
      '동일 정비이력에 대해서 명세서 생성은 여러번 발생될 수 있음.' +
      ' 기존 생성된 명세서의 발급 사실이 없을 경우에는 갱신되고' +
      ' 그 외의 경우에는 새롭게 생성됨',
  })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiCreatedResponse({
    description: `생성된 Statement 데이터`,
    type: Statement,
  })
  async genStatement(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Statement> {
    return await this.service.genStatement(token, id);
  }

  @Patch('pub/statement/:id')
  @ApiOperation({ summary: '[WORKER] 명세서 발급(프린트 or 온라인)' })
  @ApiParam({ name: 'id', description: `해당 Maintenance의 오브젝트 ID` })
  @ApiBody({ description: 'd', type: MainPubDocInfo })
  @ApiCreatedResponse({
    description: `패치 된 Maintenance 데이터`,
    type: Statement,
  })
  async pubStatement(
    @Param('id') id: string,
    @Body() doc: MainPubDocInfo,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
    return await this.service.pubStatement(token, id, doc);
  }
}
