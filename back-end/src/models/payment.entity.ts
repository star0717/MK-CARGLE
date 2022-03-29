import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * 아임포트 서버 response 결과
 */
export class Result<T> {
  @ApiProperty({ description: '코드' })
  code: number;

  @ApiProperty({ description: '메세지' })
  message: string;

  @ApiProperty({ description: '' })
  response: T;
}

/**
 * 아임포트 토큰 발급
 */
export class Token {
  @ApiProperty({ description: '아임포트 토큰' })
  access_token: string;

  @ApiProperty({ description: '현재' })
  now: number;

  @ApiProperty({ description: '만료' })
  expired_at: number;
}

/**
 * 클라이언트에 넘겨줄 결제 완료 값
 */
export class PayResult {
  @ApiProperty({ description: '결제 결과' })
  result: string;

  @ApiProperty({ description: '결제 메세지' })
  message: string;
}

/**
 * 클라이언트에서 넘어오는 결제 데이터
 */
export class PayData {
  @ApiProperty({ description: '결제번호' })
  @IsString()
  imp_uid: string;

  @ApiProperty({ description: '상품번호' })
  @IsString()
  merchant_uid: string;

  @ApiProperty({ description: '가격' })
  @IsOptional()
  @IsNumber()
  price?: number;
}

/**
 * 환불 데이터
 */
export class CancelData {
  @ApiProperty({ description: '결제번호' })
  @IsOptional()
  @IsString()
  imp_uid?: string;

  @ApiProperty({ description: '상품번호' })
  @IsOptional()
  @IsString()
  merchant_uid?: string;

  @ApiProperty({ description: '환불금액(client)' })
  @IsOptional()
  @IsNumber()
  cancel_request_amount?: number;

  @ApiProperty({ description: '환불금액(server)' })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ description: '검증금액(db)' })
  @IsOptional()
  @IsNumber()
  checksum?: number;

  @ApiProperty({ description: '환불사유' })
  @IsOptional()
  @IsString()
  reason?: string;
}

/**
 * 환불 이력
 */
export class CancelHistory {
  @ApiProperty({ description: '' })
  @IsString()
  pg_tid: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  cancelled_at: number;

  @ApiProperty({ description: '' })
  @IsString()
  reason: string;

  @ApiProperty({ description: '' })
  @IsString()
  receipt_url: string;
}

/**
 * 종합적인 결제 response
 */
export class RequestCustomResponse {
  @ApiProperty({ description: '' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: '' })
  @IsString()
  apply_num: string;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  bank_code?: string | null;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  bank_name?: string | null;

  @ApiProperty({ description: '' })
  @IsString()
  buyer_addr: string;

  @ApiProperty({ description: '' })
  @IsString()
  buyer_email: string;

  @ApiProperty({ description: '' })
  @IsString()
  buyer_name: string;

  @ApiProperty({ description: '' })
  @IsString()
  buyer_postcode: string;

  @ApiProperty({ description: '' })
  @IsString()
  buyer_tel: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  cancel_amount: number;

  @ApiProperty({ description: '' })
  @IsArray()
  cancel_history: CancelHistory[];

  @ApiProperty({ description: '' })
  @IsString()
  cancel_reason: string;

  @ApiProperty({ description: '' })
  @IsArray()
  cancel_receipt_urls: string[];

  @ApiProperty({ description: '' })
  @IsNumber()
  cancelled_at: number;

  @ApiProperty({ description: '' })
  @IsString()
  card_code: string;

  @ApiProperty({ description: '' })
  @IsString()
  card_name: string;

  @ApiProperty({ description: '' })
  @IsString()
  card_number: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  card_quota: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  card_type: number;

  @ApiProperty({ description: '' })
  @IsBoolean()
  cash_receipt_issued: boolean;

  @ApiProperty({ description: '' })
  @IsString()
  channel: string;

  @ApiProperty({ description: '' })
  @IsString()
  currency: string;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  custom_data?: string | null;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  customer_uid?: string | null;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  customer_uid_usage?: string | null;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  emb_pg_provider?: string | null;

  @ApiProperty({ description: '' })
  @IsBoolean()
  escrow: boolean;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  fail_reason?: string | null;

  @ApiProperty({ description: '' })
  @IsNumber()
  failed_at: number;

  @ApiProperty({ description: '' })
  @IsString()
  imp_uid: string;

  @ApiProperty({ description: '' })
  @IsString()
  merchant_uid: string;

  @ApiProperty({ description: '' })
  @IsString()
  name: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  paid_at: number;

  @ApiProperty({ description: '' })
  @IsString()
  pay_method: string;

  @ApiProperty({ description: '' })
  @IsString()
  pg_id: string;

  @ApiProperty({ description: '' })
  @IsString()
  pg_provider: string;

  @ApiProperty({ description: '' })
  @IsString()
  pg_tid: string;

  @ApiProperty({ description: '' })
  @IsString()
  receipt_url: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  started_at: number;

  @ApiProperty({ description: '결제 상태' })
  @IsString()
  status: string;

  @ApiProperty({ description: '' })
  @IsString()
  user_agent: string;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  vbank_code?: string | null;

  @ApiProperty({ description: '' })
  @IsNumber()
  vbank_date: number;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  vbank_holder?: string | null;

  @ApiProperty({ description: '' })
  @IsNumber()
  vbank_issued_at: number;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsString()
  vbank_name?: string | null;

  @ApiProperty({ description: '' })
  @IsString()
  vbank_num?: string | null;
}
