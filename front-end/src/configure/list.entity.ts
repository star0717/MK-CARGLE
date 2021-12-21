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
    link: "#",
    subMenu: [
      {
        key: "1.1",
        subMenuName: "부품 관리",
        subMenuLink: "#",
      },
      {
        key: "1.2",
        subMenuName: "세트 관리",
        subMenuLink: "#",
      },
      {
        key: "1.3",
        subMenuName: "거래처 관리",
        subMenuLink: "#",
      },
    ],
  },
  {
    key: "2",
    menuName: "정비",
    link: "#",
    subMenu: [
      {
        key: "2.1",
        subMenuName: "정비장부",
        subMenuLink: "#",
      },
      {
        key: "2.2",
        subMenuName: "고객/차량 관리",
        subMenuLink: "#",
      },
      {
        key: "2.3",
        subMenuName: "예약관리",
        subMenuLink: "#",
      },
    ],
  },
  {
    key: "3",
    menuName: "회계",
    link: "#",
    subMenu: [
      {
        key: "3.1",
        subMenuName: "매입/매출 현황",
        subMenuLink: "#",
      },
      {
        key: "3.2",
        subMenuName: "결산 리포트",
        subMenuLink: "#",
      },
    ],
  },
  {
    key: "4",
    menuName: "커뮤니티",
    link: "#",
    subMenu: [
      {
        key: "4.1",
        subMenuName: "연합회 소식",
        subMenuLink: "#",
      },
      {
        key: "4.2",
        subMenuName: "정비정보 공유",
        subMenuLink: "#",
      },
    ],
  },
  {
    key: "5",
    menuName: "마이페이지",
    link: UseLink.MYPAGE_ACCOUNT,
    subMenu: [
      {
        key: "5.1",
        subMenuName: "계정 관리",
        subMenuLink: UseLink.MYPAGE_ACCOUNT,
      },
      {
        key: "5.2",
        subMenuName: "직원 관리",
        subMenuLink: UseLink.MYPAGE_WORKER,
      },
      {
        key: "5.3",
        subMenuName: "포인트 관리",
        subMenuLink: "#",
      },
    ],
  },
  {
    key: "6",
    menuName: "고객센터",
    link: "#",
    subMenu: [
      {
        key: "6.1",
        subMenuName: "공지사항",
        subMenuLink: "#",
      },
      {
        key: "6.2",
        subMenuName: "사용 설명서",
        subMenuLink: "#",
      },
    ],
  },
];
