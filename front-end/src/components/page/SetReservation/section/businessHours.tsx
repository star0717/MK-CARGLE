import React, { useState } from "react";
import { NextPage } from "next";
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
  Combo,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import theme from "styles/theme";
import { _pSetBookingDataProps } from "src/configure/_pProps.entity";
import { Hours, OfficeHours, SetBooking } from "src/models/setbooking.entity";
import { useDispatch } from "react-redux";
import { _aPostSetBooking } from "store/action/user.action";
import { SetBookingTime } from "src/constants/booking.const";
import dayjs from "dayjs";

const BusinessHours: NextPage<_pSetBookingDataProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  interface KeyInput {
    id: string;
  }

  const HoursOption = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [booking, setBooking] = useState<SetBooking>(props.data);
  const [modify, setModify] = useState<boolean>(false);
  const [allDay, setAllDay] = useState({
    ALLDAY: {
      openingHours: booking.officeHour.MON.openingHours,
      closingHours: booking.officeHour.MON.closingHours,
      breakTime: booking.officeHour.MON.breakTime,
      breakEndTime: booking.officeHour.MON.breakEndTime,
    },
  });
  const [weekDay, setWeekDay] = useState({
    WEEKDAY: {
      openingHours: booking.officeHour.MON.openingHours,
      closingHours: booking.officeHour.MON.closingHours,
      breakTime: booking.officeHour.MON.breakTime,
      breakEndTime: booking.officeHour.MON.breakEndTime,
    },
    WEEKEND: {
      openingHours: booking.officeHour.SAT.openingHours,
      closingHours: booking.officeHour.SAT.closingHours,
      breakTime: booking.officeHour.SAT.breakTime,
      breakEndTime: booking.officeHour.SAT.breakEndTime,
    },
  });
  const [diffDay, setDiffDay] = useState<OfficeHours>({
    MON: {
      openingHours: booking.officeHour.MON.openingHours,
      closingHours: booking.officeHour.MON.closingHours,
      breakTime: booking.officeHour.MON.breakTime,
      breakEndTime: booking.officeHour.MON.breakEndTime,
    },
    TUE: {
      openingHours: booking.officeHour.TUE.openingHours,
      closingHours: booking.officeHour.TUE.closingHours,
      breakTime: booking.officeHour.TUE.breakTime,
      breakEndTime: booking.officeHour.TUE.breakEndTime,
    },
    WED: {
      openingHours: booking.officeHour.WED.openingHours,
      closingHours: booking.officeHour.WED.closingHours,
      breakTime: booking.officeHour.WED.breakTime,
      breakEndTime: booking.officeHour.WED.breakEndTime,
    },
    THU: {
      openingHours: booking.officeHour.THU.openingHours,
      closingHours: booking.officeHour.THU.closingHours,
      breakTime: booking.officeHour.THU.breakTime,
      breakEndTime: booking.officeHour.THU.breakEndTime,
    },
    FRI: {
      openingHours: booking.officeHour.FRI.openingHours,
      closingHours: booking.officeHour.FRI.closingHours,
      breakTime: booking.officeHour.FRI.breakTime,
      breakEndTime: booking.officeHour.FRI.breakEndTime,
    },
    SAT: {
      openingHours: booking.officeHour.SAT.openingHours,
      closingHours: booking.officeHour.SAT.closingHours,
      breakTime: booking.officeHour.SAT.breakTime,
      breakEndTime: booking.officeHour.SAT.breakEndTime,
    },
    SUN: {
      openingHours: booking.officeHour.SUN.openingHours,
      closingHours: booking.officeHour.SUN.closingHours,
      breakTime: booking.officeHour.SUN.breakTime,
      breakEndTime: booking.officeHour.SUN.breakEndTime,
    },
  });

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
  const Inputlayout = () => {
    return (
      <>
        <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`}>
          <Wrapper al={`flex-start`}>
            <Text>영업시작</Text>
            <Wrapper border={`1px solid #ccc`} dr={`row`}>
              <Combo
                disabled={!modify}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                // name={`${key.id}_openingHours_true`}
                // id={key.id}
                // value={dayjs(value.openingHours).format("HH")}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   console.log(key.id);
                //   onTimeHandler(e);
                // }}
              >
                {HoursOption.map((time) => {
                  return <option value={time}>{time}</option>;
                })}
              </Combo>
              <Text margin={`0px 4px`}>:</Text>
              <Combo
                disabled={!modify}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                // name={`${key.id}_openingHours_false`}
                // id={key.id}
                // value={dayjs(value.openingHours).format("mm")}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   console.log(key.id);
                //   onTimeHandler(e);
                // }}
              >
                <option value="00">00</option>
                <option value="30">30</option>
              </Combo>
            </Wrapper>
          </Wrapper>
          <Text margin={`18px 10px 0px 10px`}>~</Text>
          <Wrapper al={`flex-start`}>
            <Text>영업종료</Text>
            <Wrapper border={`1px solid #ccc`} dr={`row`}>
              <Combo
                disabled={!modify}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                // name={`${key.id}_closingHours_true`}
                // id={key.id}
                // value={dayjs(value.closingHours).format("HH")}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   console.log(key.id);
                //   onTimeHandler(e);
                // }}
              >
                {HoursOption.map((time) => {
                  return <option value={time}>{time}</option>;
                })}
              </Combo>
              <Text margin={`0px 4px`}>:</Text>
              <Combo
                disabled={!modify}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                // name={`${key.id}_closingHours_false`}
                // id={key.id}
                // value={dayjs(value.closingHours).format("mm")}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   console.log(key.id);
                //   onTimeHandler(e);
                // }}
              >
                <option value="00">00</option>
                <option value="30">30</option>
              </Combo>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`}>
          <Wrapper al={`flex-start`}>
            <Text>휴게시간 시작</Text>
            <Wrapper border={`1px solid #ccc`} dr={`row`}>
              <Combo
                disabled={!modify}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                // name={`${key.id}_breakTime_true`}
                // id={key.id}
                // value={dayjs(value.breakTime).format("HH")}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   console.log(key.id);
                //   onTimeHandler(e);
                // }}
              >
                {HoursOption.map((time) => {
                  return <option value={time}>{time}</option>;
                })}
              </Combo>
              <Text margin={`0px 4px`}>:</Text>
              <Combo
                disabled={!modify}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                // name={`${key.id}_breakTime_false`}
                // id={key.id}
                // value={dayjs(value.breakTime).format("mm")}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   console.log(key.id);
                //   onTimeHandler(e);
                // }}
              >
                <option value="00">00</option>
                <option value="30">30</option>
              </Combo>
            </Wrapper>
          </Wrapper>
          <Text margin={`18px 10px 0px 10px`}>~</Text>
          <Wrapper al={`flex-start`}>
            <Text>휴게시간 종료</Text>
            <Wrapper border={`1px solid #ccc`} dr={`row`}>
              <Combo
                disabled={!modify}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                // name={`${key.id}_breakEndTime_true`}
                // id={key.id}
                // value={dayjs(value.breakEndTime).format("HH")}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   console.log(key.id);
                //   onTimeHandler(e);
                // }}
              >
                {HoursOption.map((time) => {
                  return <option value={time}>{time}</option>;
                })}
              </Combo>
              <Text margin={`0px 4px`}>:</Text>
              <Combo
                disabled={!modify}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                // name={`${key.id}_breakEndTime_false`}
                // id={key.id}
                // value={dayjs(value.breakEndTime).format("mm")}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   console.log(key.id);
                //   onTimeHandler(e);
                // }}
              >
                <option value="00">00</option>
                <option value="30">30</option>
              </Combo>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </>
    );
  };

  const BussinessHourInput = () => {
    switch (booking.setBookingTime) {
      case SetBookingTime.ALL:
        return (
          <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
            <Text margin={`18px 10px 0px 0px`}>모든영업일</Text>
            <Inputlayout />
          </Wrapper>
        );
        break;
      case SetBookingTime.WEEK:
        return (
          <>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>평일영업일</Text>
              <Inputlayout />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>주말영업일</Text>
              <Inputlayout />
            </Wrapper>
          </>
        );
        break;
      case SetBookingTime.DIFF:
        return (
          <>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>월요일</Text>
              <Inputlayout />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>화요일</Text>
              <Inputlayout />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>수요일</Text>
              <Inputlayout />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>목요일</Text>
              <Inputlayout />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>금요일</Text>
              <Inputlayout />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>토요일</Text>
              <Inputlayout />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>일요일</Text>
              <Inputlayout />
            </Wrapper>
          </>
        );

        break;
      default:
        null;
    }

    // return(

    // )
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
              kindOf={
                booking.setBookingTime.includes("all") ? `workingHour` : `ghost`
              }
              checked={booking.setBookingTime.includes("all")}
              onClick={() => {
                setBooking({ ...booking, setBookingTime: SetBookingTime.ALL });
              }}
            >
              영업일 모두 같아요
            </SelectDays>
            <SelectDays
              disabled={!modify}
              kindOf={
                booking.setBookingTime.includes("week")
                  ? `workingHour`
                  : `ghost`
              }
              checked={booking.setBookingTime.includes("week")}
              onClick={() => {
                setBooking({ ...booking, setBookingTime: SetBookingTime.WEEK });
              }}
            >
              평일/주말 달라요
            </SelectDays>
            <SelectDays
              disabled={!modify}
              kindOf={
                booking.setBookingTime.includes("diff")
                  ? `workingHour`
                  : `ghost`
              }
              checked={booking.setBookingTime.includes("diff")}
              onClick={() => {
                setBooking({ ...booking, setBookingTime: SetBookingTime.DIFF });
              }}
            >
              요일마다 달라요
            </SelectDays>
          </Wrapper>
        </Wrapper>
        <BussinessHourInput />
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
