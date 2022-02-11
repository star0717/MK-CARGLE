export class AuthApiPath {
  static BASE = '/auth/';
  static signup = AuthApiPath.BASE + 'signup';
  static signin = AuthApiPath.BASE + 'signin';
  static signout = AuthApiPath.BASE + 'signout';
  static withdrawal = AuthApiPath.BASE + 'withdrawal';
  static profile = AuthApiPath.BASE + 'profile';
  static company = AuthApiPath.BASE + 'company';
  static companies = AuthApiPath.BASE + 'companies';
  static validate_com_reg_number = AuthApiPath.BASE + 'validate/com-reg-number';
  static validate_email = AuthApiPath.BASE + 'validate/email';
  static validate_email_token = AuthApiPath.BASE + 'validate/email-token';
  static validate_phone = AuthApiPath.BASE + 'validate/phone';
  static upload_com_reg_doc = AuthApiPath.BASE + 'upload/com-reg-doc';
  static upload_man_reg_doc = AuthApiPath.BASE + 'upload/man-reg-doc';
  static filename_comRegDoc = AuthApiPath.BASE + 'file-name/com-reg-doc';
  static filename_manRegDoc = AuthApiPath.BASE + 'file-name/man-reg-doc';
  static request_company = AuthApiPath.BASE + 'request/company';
  static help_email = AuthApiPath.BASE + 'help/email';
  static help_pwd = AuthApiPath.BASE + 'help/pwd';
}

export class UserApiPath {
  static BASE = '/users/';
  static users = UserApiPath.BASE;
}

export class CompanyApiPath {
  static BASE = '/companies/';
  static companies = CompanyApiPath.BASE;
}

export class AdminApiPath {
  static BASE = '/admin/';
  static review_approve_companies =
    AdminApiPath.BASE + 'review/approve/companies';
  static review_reject_companies =
    AdminApiPath.BASE + 'review/reject/companies';
  static review_delete_companies =
    AdminApiPath.BASE + 'review/delete/companies';
  /** 회사 및 사용자 관리 관련 */
  static review_comRegDoc = AdminApiPath.BASE + 'review/com-reg-doc';
  static review_mainRegDoc = AdminApiPath.BASE + 'review/main-reg-doc';
  static companies = AdminApiPath.BASE + 'companies';
  static before_companies = AdminApiPath.BASE + 'before/companies';
  static ing_companies = AdminApiPath.BASE + 'ing/companies';
  static done_companies = AdminApiPath.BASE + 'done/companies';
  static users = AdminApiPath.BASE + 'users';
  static signup_info = AdminApiPath.BASE + 'signup-info';
  /** 부품 관리 */
  static parts = AdminApiPath.BASE + 'parts';
  static parts_Class = AdminApiPath.BASE + 'parts/class';
  static part_genCode = AdminApiPath.BASE + 'parts/gen-code';
  static part_deletemany = AdminApiPath.BASE + 'parts/deletemany';
}

export class SettingsApiPath {
  static BASE = '/settings/';
  static myinfo_confirm_password =
    SettingsApiPath.BASE + 'myinfo/confirm/password';
  static myinfo = SettingsApiPath.BASE + 'myinfo';
  static myinfo_change_password =
    SettingsApiPath.BASE + 'myinfo/change/password';
  static myinfo_stamp_filename = SettingsApiPath.BASE + 'myinfo/stamp/filename';
  static myinfo_stamp = SettingsApiPath.BASE + 'myinfo/stamp';
  static management_workers = SettingsApiPath.BASE + 'management/workers';
  static management_approve_workers =
    SettingsApiPath.BASE + 'management/approve/workers';
  static management_reject_workers =
    SettingsApiPath.BASE + 'management/reject/workers';
  static management_delete_workers =
    SettingsApiPath.BASE + 'management/delete/workers';
}

// 정비내역 API
export class MaintenancesApiPath {
  static BASE = '/maintenances/';
  // static maintenances = MaintenancesApiPath.BASE;
  static carinfo = MaintenancesApiPath.BASE + 'carinfo';
  static store = MaintenancesApiPath.BASE + 'store';
  static start = MaintenancesApiPath.BASE + 'start';
  static end = MaintenancesApiPath.BASE + 'end';
  static pay = MaintenancesApiPath.BASE + 'pay';
  static release = MaintenancesApiPath.BASE + 'release';
}

// 거래처 관리 API
export class AgenciesApiPath {
  static BASE = '/agencies/';
  static agencies = AgenciesApiPath.BASE;
  static agencies_deleteMany = AgenciesApiPath.BASE + 'deletemany';
}

// 부품 조회 API (유저용)
export class PartsApiPath {
  static BASE = '/parts/';
  static parts = PartsApiPath.BASE;
}

// 부품세트 API
export class PartsSetsApiPath {
  static BASE = '/partssets';
  static partsSets = PartsSetsApiPath.BASE;
  static partsSets_deleteMany = PartsSetsApiPath.BASE + 'deletemany';
}
