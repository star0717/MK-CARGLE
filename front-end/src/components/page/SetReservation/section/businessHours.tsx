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
import { hourList } from "src/modules/commonModule";

const BusinessHours: NextPage<_pSetBookingDataProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  const allArr: string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const dayArr: string[] = ["MON", "TUE", "WED", "THU", "FRI"];
  const endArr: string[] = ["SAT", "SUN"];

  interface all_inter {
    ALLDAY: {
      openingHours: Date;
      closingHours: Date;
      breakTime: Date;
      breakEndTime: Date;
    };
    [allDay: string]: any;
  }
  interface week_inter {
    WEEKDAY: {
      openingHours: Date;
      closingHours: Date;
      breakTime: Date;
      breakEndTime: Date;
    };
    WEEKEND: {
      openingHours: Date;
      closingHours: Date;
      breakTime: Date;
      breakEndTime: Date;
    };
    [weekDay: string]: any;
  }
  interface diff_inter extends OfficeHours {
    [diffDay: string]: any;
  }

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [booking, setBooking] = useState<SetBooking>(props.booking);
  const [modify, setModify] = useState<boolean>(false);
  const [hours, setHours] = useState<OfficeHours>(
    JSON.parse(booking.officeHour)
  );

  let hoursData: diff_inter = {
    MON: {
      openingHours: hours.MON.openingHours,
      closingHours: hours.MON.closingHours,
      breakTime: hours.MON.breakTime,
      breakEndTime: hours.MON.breakEndTime,
    },
    TUE: {
      openingHours: hours.TUE.openingHours,
      closingHours: hours.TUE.closingHours,
      breakTime: hours.TUE.breakTime,
      breakEndTime: hours.TUE.breakEndTime,
    },
    WED: {
      openingHours: hours.WED.openingHours,
      closingHours: hours.WED.closingHours,
      breakTime: hours.WED.breakTime,
      breakEndTime: hours.WED.breakEndTime,
    },
    THU: {
      openingHours: hours.THU.openingHours,
      closingHours: hours.THU.closingHours,
      breakTime: hours.THU.breakTime,
      breakEndTime: hours.THU.breakEndTime,
    },
    FRI: {
      openingHours: hours.FRI.openingHours,
      closingHours: hours.FRI.closingHours,
      breakTime: hours.FRI.breakTime,
      breakEndTime: hours.FRI.breakEndTime,
    },
    SAT: {
      openingHours: hours.SAT.openingHours,
      closingHours: hours.SAT.closingHours,
      breakTime: hours.SAT.breakTime,
      breakEndTime: hours.SAT.breakEndTime,
    },
    SUN: {
      openingHours: hours.SUN.openingHours,
      closingHours: hours.SUN.closingHours,
      breakTime: hours.SUN.breakTime,
      breakEndTime: hours.SUN.breakEndTime,
    },
  };

  const [allDay, setAllDay] = useState<all_inter>({
    ALLDAY: {
      openingHours: hours.MON.openingHours,
      closingHours: hours.MON.closingHours,
      breakTime: hours.MON.breakTime,
      breakEndTime: hours.MON.breakEndTime,
    },
  });
  const [weekDay, setWeekDay] = useState<week_inter>({
    WEEKDAY: {
      openingHours: hours.MON.openingHours,
      closingHours: hours.MON.closingHours,
      breakTime: hours.MON.breakTime,
      breakEndTime: hours.MON.breakEndTime,
    },
    WEEKEND: {
      openingHours: hours.SAT.openingHours,
      closingHours: hours.SAT.closingHours,
      breakTime: hours.SAT.breakTime,
      breakEndTime: hours.SAT.breakEndTime,
    },
  });
  const [diffDay, setDiffDay] = useState<diff_inter>({
    MON: {
      openingHours: hours.MON.openingHours,
      closingHours: hours.MON.closingHours,
      breakTime: hours.MON.breakTime,
      breakEndTime: hours.MON.breakEndTime,
    },
    TUE: {
      openingHours: hours.TUE.openingHours,
      closingHours: hours.TUE.closingHours,
      breakTime: hours.TUE.breakTime,
      breakEndTime: hours.TUE.breakEndTime,
    },
    WED: {
      openingHours: hours.WED.openingHours,
      closingHours: hours.WED.closingHours,
      breakTime: hours.WED.breakTime,
      breakEndTime: hours.WED.breakEndTime,
    },
    THU: {
      openingHours: hours.THU.openingHours,
      closingHours: hours.THU.closingHours,
      breakTime: hours.THU.breakTime,
      breakEndTime: hours.THU.breakEndTime,
    },
    FRI: {
      openingHours: hours.FRI.openingHours,
      closingHours: hours.FRI.closingHours,
      breakTime: hours.FRI.breakTime,
      breakEndTime: hours.FRI.breakEndTime,
    },
    SAT: {
      openingHours: hours.SAT.openingHours,
      closingHours: hours.SAT.closingHours,
      breakTime: hours.SAT.breakTime,
      breakEndTime: hours.SAT.breakEndTime,
    },
    SUN: {
      openingHours: hours.SUN.openingHours,
      closingHours: hours.SUN.closingHours,
      breakTime: hours.SUN.breakTime,
      breakEndTime: hours.SUN.breakEndTime,
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
  const allDayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name.split("_")[2] === "hours") {
      setAllDay({
        ...allDay,
        [e.target.name.split("_")[0]]: {
          ...allDay[e.target.name.split("_")[0]],
          [e.target.name.split("_")[1]]: dayjs(
            allDay[e.target.name.split("_")[0]][e.target.name.split("_")[1]]
          )
            .hour(Number(e.target.value))
            .format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      });
    } else {
      setAllDay({
        ...allDay,
        [e.target.name.split("_")[0]]: {
          ...allDay[e.target.name.split("_")[0]],
          [e.target.name.split("_")[1]]: dayjs(
            allDay[e.target.name.split("_")[0]][e.target.name.split("_")[1]]
          )
            .minute(Number(e.target.value))
            .format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      });
    }
  };
  const weekDayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name.split("_")[2] === "hours") {
      setWeekDay({
        ...weekDay,
        [e.target.name.split("_")[0]]: {
          ...weekDay[e.target.name.split("_")[0]],
          [e.target.name.split("_")[1]]: dayjs(
            weekDay[e.target.name.split("_")[0]][e.target.name.split("_")[1]]
          )
            .hour(Number(e.target.value))
            .format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      });
    } else {
      setWeekDay({
        ...weekDay,
        [e.target.name.split("_")[0]]: {
          ...weekDay[e.target.name.split("_")[0]],
          [e.target.name.split("_")[1]]: dayjs(
            weekDay[e.target.name.split("_")[0]][e.target.name.split("_")[1]]
          )
            .minute(Number(e.target.value))
            .format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      });
    }
  };
  const diffDayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const hi = diffDay as { [key: string]: OfficeHours };
    // const ho: { [key: string]: OfficeHours } = e.target.name.split("_")[0];
    if (e.target.name.split("_")[2] === "hours") {
      setDiffDay({
        ...diffDay,
        [e.target.name.split("_")[0]]: {
          ...diffDay[e.target.name.split("_")[0]],
          [e.target.name.split("_")[1]]: dayjs(
            diffDay[e.target.name.split("_")[0]][e.target.name.split("_")[1]]
          )
            .hour(Number(e.target.value))
            .format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      });
    } else {
      setDiffDay({
        ...diffDay,
        [e.target.name.split("_")[0]]: {
          ...diffDay[e.target.name.split("_")[0]],
          [e.target.name.split("_")[1]]: dayjs(
            diffDay[e.target.name.split("_")[0]][e.target.name.split("_")[1]]
          )
            .minute(Number(e.target.value))
            .format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      });
    }
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  const Inputlayout = (key: any) => {
    const breakDay: string[] = booking.dayOff;
    let value;
    let readonly: boolean = false;
    if (breakDay.includes(key.id)) {
      readonly = true;
    }
    switch (key.id) {
      case "ALLDAY":
        value = allDay.ALLDAY;
        if (breakDay.length === 7) {
          readonly = true;
        }
        break;
      case "WEEKDAY":
        value = weekDay.WEEKDAY;

        let dayBool: boolean = true;
        dayArr.map((item) => {
          if (!breakDay.includes(item)) dayBool = false;
        });
        if (dayBool) readonly = true;

        break;
      case "WEEKEND":
        value = weekDay.WEEKEND;

        let endBool: boolean = true;
        endArr.map((item) => {
          if (!breakDay.includes(item)) endBool = false;
        });
        if (endBool) readonly = true;
        break;
      case "MON":
        value = diffDay.MON;
        break;
      case "TUE":
        value = diffDay.TUE;
        break;
      case "WED":
        value = diffDay.WED;
        break;
      case "THU":
        value = diffDay.THU;
        break;
      case "FRI":
        value = diffDay.FRI;
        break;
      case "SAT":
        value = diffDay.SAT;
        break;
      case "SUN":
        value = diffDay.SUN;
        break;

      default:
        null;
    }
    return (
      <>
        <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`} notAnimate>
          <Wrapper al={`flex-start`}>
            <Text>영업시작</Text>
            <Wrapper border={`1px solid #ccc`} dr={`row`}>
              <Combo
                disabled={!modify || readonly}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                name={`${key.id}_openingHours_hours`}
                value={dayjs(value.openingHours).format("HH")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  booking.setBookingTime === "all"
                    ? allDayHandler(e)
                    : booking.setBookingTime === "week"
                    ? weekDayHandler(e)
                    : diffDayHandler(e);
                }}
              >
                {hourList().map((time) => {
                  return (
                    <option key={time.label} value={time.value}>
                      {time.value}
                    </option>
                  );
                })}
              </Combo>
              <Text margin={`0px 4px`}>:</Text>
              <Combo
                disabled={!modify || readonly}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                name={`${key.id}_openingHours_min`}
                value={dayjs(value.openingHours).format("mm")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  booking.setBookingTime === "all"
                    ? allDayHandler(e)
                    : booking.setBookingTime === "week"
                    ? weekDayHandler(e)
                    : diffDayHandler(e);
                }}
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
                disabled={!modify || readonly}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                name={`${key.id}_closingHours_hours`}
                value={dayjs(value.closingHours).format("HH")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  booking.setBookingTime === "all"
                    ? allDayHandler(e)
                    : booking.setBookingTime === "week"
                    ? weekDayHandler(e)
                    : diffDayHandler(e);
                }}
              >
                {hourList().map((time) => {
                  return (
                    <option key={time.label} value={time.value}>
                      {time.value}
                    </option>
                  );
                })}
              </Combo>
              <Text margin={`0px 4px`}>:</Text>
              <Combo
                disabled={!modify || readonly}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                name={`${key.id}_closingHours_min`}
                value={dayjs(value.closingHours).format("mm")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  booking.setBookingTime === "all"
                    ? allDayHandler(e)
                    : booking.setBookingTime === "week"
                    ? weekDayHandler(e)
                    : diffDayHandler(e);
                }}
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
                disabled={!modify || readonly}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                name={`${key.id}_breakTime_hours`}
                value={dayjs(value.breakTime).format("HH")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  booking.setBookingTime === "all"
                    ? allDayHandler(e)
                    : booking.setBookingTime === "week"
                    ? weekDayHandler(e)
                    : diffDayHandler(e);
                }}
              >
                {hourList().map((time) => {
                  return (
                    <option key={time.label} value={time.value}>
                      {time.value}
                    </option>
                  );
                })}
              </Combo>
              <Text margin={`0px 4px`}>:</Text>
              <Combo
                disabled={!modify || readonly}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                name={`${key.id}_breakTime_min`}
                value={dayjs(value.breakTime).format("mm")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  booking.setBookingTime === "all"
                    ? allDayHandler(e)
                    : booking.setBookingTime === "week"
                    ? weekDayHandler(e)
                    : diffDayHandler(e);
                }}
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
                disabled={!modify || readonly}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                name={`${key.id}_breakEndTime_hours`}
                value={dayjs(value.breakEndTime).format("HH")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  booking.setBookingTime === "all"
                    ? allDayHandler(e)
                    : booking.setBookingTime === "week"
                    ? weekDayHandler(e)
                    : diffDayHandler(e);
                }}
              >
                {hourList().map((time) => {
                  return (
                    <option key={time.label} value={time.value}>
                      {time.value}
                    </option>
                  );
                })}
              </Combo>
              <Text margin={`0px 4px`}>:</Text>
              <Combo
                disabled={!modify || readonly}
                border={`none`}
                width={`100px`}
                textAlign={`center`}
                name={`${key.id}_breakEndTime_min`}
                value={dayjs(value.breakEndTime).format("mm")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  booking.setBookingTime === "all"
                    ? allDayHandler(e)
                    : booking.setBookingTime === "week"
                    ? weekDayHandler(e)
                    : diffDayHandler(e);
                }}
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
            <Inputlayout id="ALLDAY" />
          </Wrapper>
        );
        break;
      case SetBookingTime.WEEK:
        return (
          <>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>평일영업일</Text>
              <Inputlayout id="WEEKDAY" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>주말영업일</Text>
              <Inputlayout id="WEEKEND" />
            </Wrapper>
          </>
        );
        break;
      case SetBookingTime.DIFF:
        return (
          <>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>월요일</Text>
              <Inputlayout id="MON" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>화요일</Text>
              <Inputlayout id="TUE" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>수요일</Text>
              <Inputlayout id="WED" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>목요일</Text>
              <Inputlayout id="THU" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>금요일</Text>
              <Inputlayout id="FRI" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>토요일</Text>
              <Inputlayout id="SAT" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>일요일</Text>
              <Inputlayout id="SUN" />
            </Wrapper>
          </>
        );

        break;
      default:
        null;
    }
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
                {
                  if (booking.setBookingTime === "all") {
                    allArr.map((item) => {
                      hoursData[item] = allDay.ALLDAY;
                    });
                  } else if (booking.setBookingTime === "week") {
                    dayArr.map((item) => {
                      hoursData[item] = weekDay.WEEKDAY;
                    });
                    endArr.map((item) => {
                      hoursData[item] = weekDay.WEEKEND;
                    });
                  } else {
                    allArr.map((item) => {
                      hoursData[item] = diffDay[item];
                    });
                  }
                }
                const data = {
                  ...booking,
                  officeHour: JSON.stringify(hoursData),
                };
                await dispatch(_aPostSetBooking(data)).then((res: any) => {
                  setBooking(res.payload);
                  props.setBooking(res.payload);
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
