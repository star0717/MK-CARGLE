/**
 * @name "카카오 버튼타입"
 */
declare type _fKakaoButtonType = 'WL' | 'AL' | 'BK' | 'MD' | 'DS' | 'BC' | 'BT' | 'AC';
export declare type _fKakaoButton = {
    buttonName: string;
    buttonType: _fKakaoButtonType;
    linkMo?: string;
    linkPc?: string;
    linkAnd?: string;
    linkIos?: string;
};
export declare class _fKakaoOption {
    pfId: string;
    templateId?: string;
    variables?: Record<string, string>;
    disableSms: boolean;
    adFlag: boolean;
    buttons?: Array<_fKakaoButton>;
    imageId?: string;
    constructor(pfId: string, templateId: string, variables: Record<string, string>, disableSms: boolean, adFlag: boolean, buttons: Array<_fKakaoButton>, imageId: string);
}
/**
 * @name MessageType 메시지 유형(단문 문자, 장문 문자, 알림톡 등)
 * SMS: 단문 문자
 * LMS: 장문 문자
 * MMS: 사진 문자
 * ATA: 알림톡
 * CTA: 친구톡
 * CTI: 사진 한장이 포함된 친구톡
 * RCS_SMS: RCS 단문 문자
 * RCS_LMS: RCS 장문 문자
 * RCS_MMS: RCS 사진 문자
 * RCS_TPL: RCS 템플릿
 * NSA: 네이버 스마트알림(톡톡)
 */
export declare type _fMessageType = 'SMS' | 'LMS' | 'MMS' | 'ATA' | 'CTA' | 'CTI' | 'RCS_SMS' | 'RCS_LMS' | 'RCS_MMS' | 'RCS_TPL' | 'NSA';
/**
 * 메시지 모델
 */
export declare class _fMessage {
    /**
     * 수신번호
     */
    to: string;
    /**
     * 발신번호
     */
    from: string;
    /**
     * 메시지 내용
     */
    text?: string;
    /**
     * 메시지 생성일자
     */
    dateCreated?: string;
    /**
     * 메시지 수정일자
     */
    dateUpdated?: string;
    /**
     * 메시지의 그룹 ID
     */
    groupId?: string;
    /**
     * 해당 메시지의 ID
     */
    messageId?: string;
    /**
     * MMS 전용 스토리지(이미지) ID
     */
    imageId?: string;
    /**
     * @name MessageType 메시지 유형
     */
    type?: _fMessageType;
    /**
     * 문자 제목(LMS, MMS 전용)
     */
    subject?: string;
    /**
     * 메시지 타입 감지 여부(비활성화 시 반드시 타입이 명시 되어야 함)
     */
    autoTypeDetect: boolean;
    /**
     * 카카오 알림톡/친구톡을 위한 프로퍼티
     */
    kakaoOptions?: _fKakaoOption;
    /**
     * 해외 문자 발송을 위한 국가번호(예) "82", "1" 등)
     */
    country?: string;
    /**
     * 메시지 로그
     */
    log?: Array<object>;
    constructor(to: string, from: string, text: string, dateCreated: string, dateUpdated: string, groupId: string, messageId: string, imageId: string, type: _fMessageType, subject: string, autoTypeDetect: boolean, kakaoOptions: _fKakaoOption, country: string);
}
export declare type GetMessagesResponse = {
    startKey: string | null;
    nextKey: string | null;
    limit: number;
    messageList: Record<string, _fMessage>;
};
export {};
