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
    menuName: "부품",
    subMenu: [
      {
        subMenuName: "부품 관리",
        subMenuLink: "#",
      },
      {
        subMenuName: "세트 관리",
        subMenuLink: "#",
      },
      {
        subMenuName: "거래처 관리",
        subMenuLink: "#",
      },
    ],
  },
  {
    menuName: "정비",
    subMenu: [
      {
        subMenuName: "정비장부",
        subMenuLink: "#",
      },
      {
        subMenuName: "고객/차량 관리",
        subMenuLink: "#",
      },
      {
        subMenuName: "예약관리",
        subMenuLink: "#",
      },
    ],
  },
  {
    menuName: "회계",
    subMenu: [
      {
        subMenuName: "매입/매출 현황",
        subMenuLink: "#",
      },
      {
        subMenuName: "결산 리포트",
        subMenuLink: "#",
      },
    ],
  },
  {
    menuName: "커뮤니티",
    subMenu: [
      {
        subMenuName: "연합회 소식",
        subMenuLink: "#",
      },
      {
        subMenuName: "정비정보 공유",
        subMenuLink: "#",
      },
    ],
  },
  {
    menuName: "마이페이지",
    subMenu: [
      {
        subMenuName: "계정 관리",
        subMenuLink: UseLink.MYPAGE_ACCOUNT,
      },
      {
        subMenuName: "직원 관리",
        subMenuLink: UseLink.MYPAGE_WORKER,
      },
      {
        subMenuName: "포인트 관리",
        subMenuLink: "#",
      },
    ],
  },
  {
    menuName: "고객센터",
    subMenu: [
      {
        subMenuName: "공지사항",
        subMenuLink: "#",
      },
      {
        subMenuName: "사용 설명서",
        subMenuLink: "#",
      },
    ],
  },
];
