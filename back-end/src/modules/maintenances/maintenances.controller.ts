import { MaintenanceCustomerTypeList2 } from './../../constants/model.const';
import { MaintenanceCustomerType } from './../../../../front-end/src/constants/model.const';
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
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { Maintenance } from 'src/models/maintenance.entity';
import { MaintenancesService } from './maintenances.service';
import { MaintenanceCustomerTypeList } from 'src/constants/model.const';

@Controller('maintenances')
@ApiTags('정비내역 API')
export class MaintenancesController {
  constructor(private readonly service: MaintenancesService) {}

  @Post()
  @ApiOperation({ summary: `[WORKER] 가장 새로운 Maintenance 데이터 추가` })
  @ApiBody({ description: `추가할 Maintenance 데이터`, type: Maintenance })
  @ApiCreatedResponse({
    description: `추가된 Maintenance 데이터`,
    type: Maintenance,
  })
  async create(
    @Body() doc: Maintenance,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Maintenance> {
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
    console.log('첫번째');
    // console.log(MaintenanceCustomerTypeList.length);
    // console.log(MaintenanceCustomerTypeList[0]);
    console.log('두번째');
    // console.log(MaintenanceCustomerTypeList2.length);
    // console.log(MaintenanceCustomerTypeList2[0]);
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
}
