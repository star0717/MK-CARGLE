import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  SelectDays,
  TextInput,
  TextInput2,
  CommonButton,
  CommonButtonWrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import theme from "styles/theme";

const BusinessHours: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper notAnimate>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>예약설정</CommonTitle>
          <CommonSubTitle>
            얘약과 관련된 업체정보를 설정할 수 있어요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`} ju={`flex-start`}>
          <Wrapper
            color={`#c4c4c4`}
            padding={`10px`}
            width={`120px`}
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET}`);
            }}
            cursor={`pointer`}
          >
            <Text>기본정보</Text>
          </Wrapper>
          <Wrapper
            padding={`10px`}
            width={`120px`}
            borderBottom={`2px solid #314fa5`}
            cursor={`pointer`}
          >
            <Text>영업시간</Text>
          </Wrapper>
          <Wrapper
            padding={`10px`}
            width={`120px`}
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET}?step=S`);
            }}
            cursor={`pointer`}
          >
            <Text color={`#c4c4c4`}>정비정보</Text>
          </Wrapper>
        </Wrapper>
        <Wrapper
          al={`flex-start`}
          padding={`20px 0px 10px`}
          color={theme.basicTheme_C}
          fontWeight={`800`}
        >
          <Text>휴무일을 알려주세요</Text>
        </Wrapper>
        <Wrapper borderBottom={`1px solid #ccc`} padding={`0px 0px 40px`}>
          <Wrapper dr={`row`} ju={`flex-start`}>
            <SelectDays>월</SelectDays>
            <SelectDays>화</SelectDays>
            <SelectDays>수</SelectDays>
            <SelectDays>목</SelectDays>
            <SelectDays>금</SelectDays>
            <SelectDays>토</SelectDays>
            <SelectDays>일</SelectDays>
          </Wrapper>
        </Wrapper>
        <Wrapper
          al={`flex-start`}
          padding={`20px 0px 10px`}
          color={theme.basicTheme_C}
          fontWeight={`800`}
        >
          <Text>영업시간을 알려주세요</Text>
        </Wrapper>
        <Wrapper borderBottom={`1px solid #ccc`} padding={`0px 0px 40px`}>
          <Wrapper dr={`row`} ju={`flex-start`}>
            <SelectDays kindOf={`focus`}>영업일 모두 같아요</SelectDays>
            <SelectDays kindOf={`ghost`}>평일/주말 달라요</SelectDays>
            <SelectDays kindOf={`ghost`}>요일마다 달라요</SelectDays>
          </Wrapper>
          <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
            <Text margin={`18px 10px 0px 0px`}>모든 영업일</Text>
            <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`}>
              <Wrapper al={`flex-start`}>
                <Text>영업시작</Text>
                <TextInput2 placeholder=":" textAlign={`center`} />
              </Wrapper>
              <Text margin={`18px 10px 0px 10px`}>~</Text>
              <Wrapper al={`flex-start`}>
                <Text>영업종료</Text>
                <TextInput2 placeholder=":" textAlign={`center`} />
              </Wrapper>
            </Wrapper>
            <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`}>
              <Wrapper al={`flex-start`}>
                <Text>휴게시간 시작</Text>
                <TextInput2 placeholder=":" textAlign={`center`} />
              </Wrapper>
              <Text margin={`18px 10px 0px 10px`}>~</Text>
              <Wrapper al={`flex-start`}>
                <Text>휴게시간 종료</Text>
                <TextInput2 placeholder=":" textAlign={`center`} />
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <CommonButtonWrapper ju={`space-around`}>
          <CommonButton kindOf={`white`}>취소</CommonButton>
          <CommonButton>저장</CommonButton>
        </CommonButtonWrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};
export default BusinessHours;
