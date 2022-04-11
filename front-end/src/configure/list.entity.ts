import { UserAuthority } from "../constants/model.const";
import { MbType } from "./etc.entity";
import { UseLink } from "./router.entity";

/**
 * 업종 리스트
 */
export const mbTypeOption: MbType[] = [
  { value: "1급", text: "1급 자동차 공업사(자동차 종합 정비소)" },
  { value: "2급", text: "2급 자동차 공업사(소형 자동차 정비소)" },
  { value: "3급", text: "3급 자동차 공업사(자동차 전문 정비소)" },
];

/**
 * 홈페이지 메뉴 리스트
 */
export const menuList = [
  {
    key: "1",
    menuName: "부품",
    link: UseLink.MAN_PARTS,
    auth: UserAuthority.WORKER,
    subMenu: [
      {
        key: "1.1",
        subMenuName: "부품 관리",
        subMenuLink: UseLink.MAN_PARTS,
        subMenuAuth: UserAuthority.WORKER,
      },
      {
        key: "1.2",
        subMenuName: "세트 관리",
        subMenuLink: UseLink.MAN_SET,
        subMenuAuth: UserAuthority.WORKER,
      },
      {
        key: "1.3",
        subMenuName: "거래처 관리",
        subMenuLink: UseLink.MAN_BUSINESS,
        subMenuAuth: UserAuthority.WORKER,
      },
    ],
  },
  {
    key: "2",
    menuName: "정비",
    link: UseLink.MAINTENANCE_BOOK,
    auth: UserAuthority.WORKER,
    subMenu: [
      {
        key: "2.1",
        subMenuName: "정비장부",
        subMenuLink: UseLink.MAINTENANCE_BOOK,
        subMenuAuth: UserAuthority.WORKER,
      },
      {
        key: "2.2",
        subMenuName: "고객관리",
        subMenuLink: UseLink.MAN_CUSTOMER,
        subMenuAuth: UserAuthority.WORKER,
      },
      {
        key: "2.3",
        subMenuName: "예약관리",
        subMenuLink: UseLink.MAN_RESERVATION,
        subMenuAuth: UserAuthority.WORKER,
      },
    ],
  },
  {
    key: "3",
    menuName: "회계",
    link: "#",
    auth: UserAuthority.OWNER,
    subMenu: [
      {
        key: "3.1",
        subMenuName: "매입/매출 현황",
        subMenuLink: "#",
        subMenuAuth: UserAuthority.OWNER,
      },
      {
        key: "3.2",
        subMenuName: "결산 리포트",
        subMenuLink: "#",
        subMenuAuth: UserAuthority.OWNER,
      },
    ],
  },
  {
    key: "4",
    menuName: "커뮤니티",
    link: "#",
    auth: UserAuthority.WORKER,
    subMenu: [
      {
        key: "4.1",
        subMenuName: "연합회 소식",
        subMenuLink: "#",
        subMenuAuth: UserAuthority.WORKER,
      },
      {
        key: "4.2",
        subMenuName: "정비정보 공유",
        subMenuLink: "#",
        subMenuAuth: UserAuthority.WORKER,
      },
    ],
  },
  {
    key: "5",
    menuName: "마이페이지",
    link: UseLink.MYPAGE_ACCOUNT,
    auth: UserAuthority.WORKER,
    subMenu: [
      {
        key: "5.1",
        subMenuName: "계정 관리",
        subMenuLink: UseLink.MYPAGE_ACCOUNT,
        subMenuAuth: UserAuthority.WORKER,
      },
      {
        key: "5.2",
        subMenuName: "직원 관리",
        subMenuLink: UseLink.MYPAGE_WORKER,
        subMenuAuth: UserAuthority.OWNER,
      },
      {
        key: "5.3",
        subMenuName: "예약 설정",
        subMenuLink: UseLink.MYPAGE_SET_BOOKING,
        subMenuAuth: UserAuthority.OWNER,
      },
      {
        key: "5.4",
        subMenuName: "포인트 관리",
        subMenuLink: "#",
        subMenuAuth: UserAuthority.WORKER,
      },
    ],
  },
  {
    key: "6",
    menuName: "고객센터",
    link: "#",
    auth: UserAuthority.WORKER,
    subMenu: [
      {
        key: "6.1",
        subMenuName: "공지사항",
        subMenuLink: "#",
        subMenuAuth: UserAuthority.WORKER,
      },
      {
        key: "6.2",
        subMenuName: "사용 설명서",
        subMenuLink: "#",
        subMenuAuth: UserAuthority.WORKER,
      },
    ],
  },
  {
    key: "7",
    menuName: "회원",
    link: UseLink.ADMIN_REVIEW_COMPANIES,
    auth: UserAuthority.ADMIN,
    subMenu: [
      {
        key: "7.1",
        subMenuName: "승인관리",
        subMenuLink: UseLink.ADMIN_REVIEW_COMPANIES,
        subMenuAuth: UserAuthority.ADMIN,
      },
      {
        key: "7.2",
        subMenuName: "업체관리",
        subMenuLink: UseLink.ADMIN_MAN_COMPANIES,
        subMenuAuth: UserAuthority.ADMIN,
      },
      {
        key: "7.3",
        subMenuName: "직원관리",
        subMenuLink: UseLink.ADMIN_USERS,
        subMenuAuth: UserAuthority.ADMIN,
      },
    ],
  },
  {
    key: "8",
    menuName: "부품",
    link: UseLink.ADMIN_MAN_PARTS,
    auth: UserAuthority.ADMIN,
    subMenu: [
      {
        key: "8.1",
        subMenuName: "부품관리",
        subMenuLink: UseLink.ADMIN_MAN_PARTS,
        subMenuAuth: UserAuthority.ADMIN,
      },
      {
        key: "8.2",
        subMenuName: "국토부항목관리",
        subMenuLink: UseLink.ADMIN_MOLIT_ITEMS,
        subMenuAuth: UserAuthority.ADMIN,
      },
    ],
  },
];
