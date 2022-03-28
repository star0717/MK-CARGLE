/**
 * 아임포트 서버 response 결과
 */
export declare class Result<T> {
    code: number;
    message: string;
    response: T;
}
/**
 * 아임포트 토큰 발급
 */
export declare class Token {
    access_token: string;
    now: number;
    expired_at: number;
}
/**
 * 클라이언트에 넘겨줄 결제 완료 값
 */
export declare class PayResult {
    result: string;
    message: string;
}
/**
 * 클라이언트에서 넘어오는 결제 데이터
 */
export declare class PayData {
    imp_uid: string;
    merchant_uid: string;
    price?: number;
}
/**
 * 환불 데이터
 */
export declare class CancelData {
    imp_uid?: string;
    merchant_uid?: string;
    cancel_request_amount?: number;
    amount?: number;
    checksum?: number;
    reason?: string;
}
/**
 * 환불 이력
 */
export declare class CancelHistory {
    pg_tid: string;
    amount: number;
    cancelled_at: number;
    reason: string;
    receipt_url: string;
}
/**
 * 종합적인 결제 response
 */
export declare class RequestCustomResponse {
    amount: number;
    apply_num: string;
    bank_code?: string | null;
    bank_name?: string | null;
    buyer_addr: string;
    buyer_email: string;
    buyer_name: string;
    buyer_postcode: string;
    buyer_tel: string;
    cancel_amount: number;
    cancel_history: CancelHistory[];
    cancel_reason: string;
    cancel_receipt_urls: string[];
    cancelled_at: number;
    card_code: string;
    card_name: string;
    card_number: string;
    card_quota: number;
    card_type: number;
    cash_receipt_issued: boolean;
    channel: string;
    currency: string;
    custom_data?: string | null;
    customer_uid?: string | null;
    customer_uid_usage?: string | null;
    emb_pg_provider?: string | null;
    escrow: boolean;
    fail_reason?: string | null;
    failed_at: number;
    imp_uid: string;
    merchant_uid: string;
    name: string;
    paid_at: number;
    pay_method: string;
    pg_id: string;
    pg_provider: string;
    pg_tid: string;
    receipt_url: string;
    started_at: number;
    status: string;
    user_agent: string;
    vbank_code?: string | null;
    vbank_date: number;
    vbank_holder?: string | null;
    vbank_issued_at: number;
    vbank_name?: string | null;
    vbank_num?: string | null;
}
