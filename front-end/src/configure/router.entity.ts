export class MobileRoute {
  static BASE = "/mobileBooking/";
  static m_car_select = MobileRoute.BASE + "m_car_select";
  static m_car_info = MobileRoute.BASE + "m_car_info";
  static m_booking = MobileRoute.BASE + "m_booking";
  static m_complete = MobileRoute.BASE + "m_complete";
}

export class UseLink {
  static INDEX = "/";
  static SIGN = "/sign/";
  static V = "/v/";
  // 기본(로그인x)
  static SIGNUP = UseLink.SIGN + "signup";
  static FIND_EMAIL = UseLink.SIGN + "findemail";
  static FIND_PASSWORD = UseLink.SIGN + "findpassword";
  // 메인(로그인o)
  static MAIN = UseLink.V + "main";
  static MAN_PARTS = UseLink.V + "parts/man_parts";
  static MAN_SET = UseLink.V + "parts/man_set";
  static MAN_BUSINESS = UseLink.V + "parts/man_business";
  static MYPAGE_ACCOUNT = UseLink.V + "mypage/account";
  static MYPAGE_WORKER = UseLink.V + "mypage/worker";
  static MYPAGE_SET_BOOKING = UseLink.V + "mypage/set_booking";
  static MAINTENANCE_BOOK = UseLink.V + "maintenance/maintenance_book";
  static MAN_CUSTOMER = UseLink.V + "maintenance/man_customer";
  static MAN_BOOKING = UseLink.V + "maintenance/man_booking";

  static TEST = UseLink.V + "test";
  // 관리자(Admin)
  static ADMIN_REVIEW_COMPANIES = UseLink.V + "admin/review_companies";
  static ADMIN_MAN_COMPANIES = UseLink.V + "admin/man_companies";
  static ADMIN_USERS = UseLink.V + "admin/users";
  static ADMIN_MAN_PARTS = UseLink.V + "admin/man_parts";
  static ADMIN_MOLIT_ITEMS = UseLink.V + "admin/molit_items";
  static ADMIN_TEST = UseLink.V + "admin/test";
}
