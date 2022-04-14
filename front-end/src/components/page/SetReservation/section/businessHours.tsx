import React, { useState } from "react";
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
  TextInput2,
  CommonButton,
  CommonButtonWrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import theme from "styles/theme";
import { _pSetBookingDataProps } from "src/configure/_pProps.entity";
import { SetBooking } from "src/models/setbooking.entity";
import { useDispatch } from "react-redux";
import { _aPostSetBooking } from "store/action/user.action";
import { SetBookingTime } from "src/constants/booking.const";

const BusinessHours: NextPage<_pSetBookingDataProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [booking, setBooking] = useState<SetBooking>(props.data);
  const [modify, setModify] = useState<boolean>(false);
  const [businessTime, setBusinessTime] = useState<SetBookingTime>(
    booking.setBookingTime
  );
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  const dayOffHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button: HTMLButtonElement = e.currentTarget;

    if (booking.dayOff.includes(button.name)) {
      setBooking({
        ...booking,
        dayOff: booking.dayOff.filter((dayOff) => dayOff !== button.name),
      });
    } else {
      const arr: string[] = booking.dayOff.concat(button.name);
      setBooking({
        ...booking,
        dayOff: arr,
      });
    }
  };
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  const BusinessHourInput = () => {
    return (
      <>
        <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`}>
          <Wrapper al={`flex-start`}>
            <Text>영업시작</Text>
            <Wrapper border={`1px solid #ccc`} dr={`row`}>
              <TextInput2
                border={`none`}
                textAlign={`center`}
                width={`100px`}
              />
              <Text margin={`0px 4px`}>:</Text>
              <TextInput2
                border={`none`}
                textAlign={`center`}
                width={`100px`}
              />
            </Wrapper>
          </Wrapper>
          <Text margin={`18px 10px 0px 10px`}>~</Text>
          <Wrapper al={`flex-start`}>
            <Text>영업종료</Text>
            <Wrapper border={`1px solid #ccc`} dr={`row`}>
              <TextInput2
                border={`none`}
                textAlign={`center`}
                width={`100px`}
              />
              <Text margin={`0px 4px`}>:</Text>
              <TextInput2
                border={`none`}
                textAlign={`center`}
                width={`100px`}
              />
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`}>
          <Wrapper al={`flex-start`}>
            <Text>휴게시간 시작</Text>
            <Wrapper border={`1px solid #ccc`} dr={`row`}>
              <TextInput2
                border={`none`}
                textAlign={`center`}
                width={`100px`}
              />
              <Text margin={`0px 4px`}>:</Text>
              <TextInput2
                border={`none`}
                textAlign={`center`}
                width={`100px`}
              />
            </Wrapper>
          </Wrapper>
          <Text margin={`18px 10px 0px 10px`}>~</Text>
          <Wrapper al={`flex-start`}>
            <Text>휴게시간 종료</Text>
            <Wrapper border={`1px solid #ccc`} dr={`row`}>
              <TextInput2
                border={`none`}
                textAlign={`center`}
                width={`100px`}
              />
              <Text margin={`0px 4px`}>:</Text>
              <TextInput2
                border={`none`}
                textAlign={`center`}
                width={`100px`}
              />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </>
    );
  };
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
              router.push(`${UseLink.MYPAGE_SET_BOOKING}`);
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
              router.push(`${UseLink.MYPAGE_SET_BOOKING}?step=S`);
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
            <SelectDays
              disabled={!modify}
              name="MON"
              checked={booking.dayOff.includes("MON")}
              kindOf={booking.dayOff.includes("MON") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              월
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="TUE"
              checked={booking.dayOff.includes("TUE")}
              kindOf={booking.dayOff.includes("TUE") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              화
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="WED"
              checked={booking.dayOff.includes("WED")}
              kindOf={booking.dayOff.includes("WED") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              수
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="THU"
              checked={booking.dayOff.includes("THU")}
              kindOf={booking.dayOff.includes("THU") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              목
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="FRI"
              checked={booking.dayOff.includes("FRI")}
              kindOf={booking.dayOff.includes("FRI") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              금
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="SAT"
              checked={booking.dayOff.includes("SAT")}
              kindOf={booking.dayOff.includes("SAT") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              토
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="SUN"
              checked={booking.dayOff.includes("SUN")}
              kindOf={booking.dayOff.includes("SUN") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              일
            </SelectDays>
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
            <SelectDays
              disabled={!modify}
              kindOf={businessTime.includes("all") ? `workingHour` : `ghost`}
              checked={businessTime.includes("all")}
              onClick={() => {
                setBusinessTime(SetBookingTime.ALL);
              }}
            >
              영업일 모두 같아요
            </SelectDays>
            <SelectDays
              disabled={!modify}
              kindOf={businessTime.includes("week") ? `workingHour` : `ghost`}
              checked={businessTime.includes("week")}
              onClick={() => {
                setBusinessTime(SetBookingTime.WEEK);
              }}
            >
              평일/주말 달라요
            </SelectDays>
            <SelectDays
              disabled={!modify}
              kindOf={businessTime.includes("diff") ? `workingHour` : `ghost`}
              checked={businessTime.includes("diff")}
              onClick={() => {
                setBusinessTime(SetBookingTime.DIFF);
              }}
            >
              요일마다 달라요
            </SelectDays>
          </Wrapper>
          {businessTime === SetBookingTime.ALL ? (
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>모든 영업일</Text>
              <BusinessHourInput />
            </Wrapper>
          ) : (
            <>
              {businessTime === SetBookingTime.WEEK ? (
                <>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0px 0px`}
                  >
                    <Text margin={`18px 10px 0px 0px`}>평일 영업일</Text>
                    <BusinessHourInput />
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0px 0px`}
                  >
                    <Text margin={`18px 10px 0px 0px`}>주말 영업일</Text>
                    <BusinessHourInput />
                  </Wrapper>
                </>
              ) : (
                <>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0px 0px`}
                  >
                    <Text margin={`18px 10px 0px 0px`}>월요일</Text>
                    <BusinessHourInput />
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0px 0px`}
                  >
                    <Text margin={`18px 10px 0px 0px`}>화요일</Text>
                    <BusinessHourInput />
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0px 0px`}
                  >
                    <Text margin={`18px 10px 0px 0px`}>수요일</Text>
                    <BusinessHourInput />
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0px 0px`}
                  >
                    <Text margin={`18px 10px 0px 0px`}>목요일</Text>
                    <BusinessHourInput />
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0px 0px`}
                  >
                    <Text margin={`18px 10px 0px 0px`}>금요일</Text>
                    <BusinessHourInput />
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0px 0px`}
                  >
                    <Text margin={`18px 10px 0px 0px`}>토요일</Text>
                    <BusinessHourInput />
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0px 0px`}
                  >
                    <Text margin={`18px 10px 0px 0px`}>일요일</Text>
                    <BusinessHourInput />
                  </Wrapper>
                </>
              )}
            </>
          )}
        </Wrapper>
        {modify ? (
          <CommonButtonWrapper ju={`space-around`}>
            <CommonButton
              kindOf={`white`}
              onClick={() => {
                setBooking(props.data);
                setModify(false);
              }}
            >
              취소
            </CommonButton>
            <CommonButton
              onClick={async () => {
                await dispatch(_aPostSetBooking(booking)).then((res: any) => {
                  setBooking(res.payload);
                  alert("저장 되었습니다!");
                });

                setModify(false);
              }}
            >
              저장
            </CommonButton>
          </CommonButtonWrapper>
        ) : (
          <CommonButtonWrapper ju={`space-around`}>
            <CommonButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setModify(true);
                window.scroll({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              수정
            </CommonButton>
          </CommonButtonWrapper>
        )}
      </RsWrapper>
    </WholeWrapper>
  );
};
export default BusinessHours;
