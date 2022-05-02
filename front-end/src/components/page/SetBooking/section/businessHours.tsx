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
import { OfficeHours, SetBooking } from "src/models/setbooking.entity";
import { useDispatch } from "react-redux";
import { _aPostSetBooking } from "store/action/user.action";
import { SetBookingTime } from "src/constants/booking.const";
import dayjs from "dayjs";
import { hourList } from "src/modules/commonModule";
import { deleteKeyJson } from "src/modules/commonModule";

const BusinessHours: NextPage<_pSetBookingDataProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  const allArr: string[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const dayArr: string[] = ["mon", "tue", "wed", "thu", "fri"];
  const endArr: string[] = ["sat", "sun"];

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
  const [booking, setBooking] = useState<Partial<SetBooking>>(props.booking);
  const [modify, setModify] = useState<boolean>(false);
  const [hours, setHours] = useState<OfficeHours>(
    booking.officeHour !== ""
      ? JSON.parse(booking.officeHour)
      : {
          mon: {
            openingHours: dayjs("2022-01-01 09:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            closingHours: dayjs("2022-01-01 18:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakTime: dayjs("2022-01-01 12:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakEndTime: dayjs("2022-01-01 13:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
          },
          tue: {
            openingHours: dayjs("2022-01-01 09:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            closingHours: dayjs("2022-01-01 18:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakTime: dayjs("2022-01-01 12:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakEndTime: dayjs("2022-01-01 13:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
          },
          wed: {
            openingHours: dayjs("2022-01-01 09:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            closingHours: dayjs("2022-01-01 18:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakTime: dayjs("2022-01-01 12:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakEndTime: dayjs("2022-01-01 13:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
          },
          thu: {
            openingHours: dayjs("2022-01-01 09:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            closingHours: dayjs("2022-01-01 18:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakTime: dayjs("2022-01-01 12:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakEndTime: dayjs("2022-01-01 13:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
          },
          fri: {
            openingHours: dayjs("2022-01-01 09:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            closingHours: dayjs("2022-01-01 18:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakTime: dayjs("2022-01-01 12:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakEndTime: dayjs("2022-01-01 13:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
          },
          sat: {
            openingHours: dayjs("2022-01-01 09:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            closingHours: dayjs("2022-01-01 18:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakTime: dayjs("2022-01-01 12:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakEndTime: dayjs("2022-01-01 13:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
          },
          sun: {
            openingHours: dayjs("2022-01-01 09:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            closingHours: dayjs("2022-01-01 18:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakTime: dayjs("2022-01-01 12:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
            breakEndTime: dayjs("2022-01-01 13:00:00").format(
              "YYYY-MM-DDTHH:mm:ssZ"
            ),
          },
        }
  );
  let hoursData: diff_inter = {
    mon: {
      openingHours: hours.mon.openingHours,
      closingHours: hours.mon.closingHours,
      breakTime: hours.mon.breakTime,
      breakEndTime: hours.mon.breakEndTime,
    },
    tue: {
      openingHours: hours.tue.openingHours,
      closingHours: hours.tue.closingHours,
      breakTime: hours.tue.breakTime,
      breakEndTime: hours.tue.breakEndTime,
    },
    wed: {
      openingHours: hours.wed.openingHours,
      closingHours: hours.wed.closingHours,
      breakTime: hours.wed.breakTime,
      breakEndTime: hours.wed.breakEndTime,
    },
    thu: {
      openingHours: hours.thu.openingHours,
      closingHours: hours.thu.closingHours,
      breakTime: hours.thu.breakTime,
      breakEndTime: hours.thu.breakEndTime,
    },
    fri: {
      openingHours: hours.fri.openingHours,
      closingHours: hours.fri.closingHours,
      breakTime: hours.fri.breakTime,
      breakEndTime: hours.fri.breakEndTime,
    },
    sat: {
      openingHours: hours.sat.openingHours,
      closingHours: hours.sat.closingHours,
      breakTime: hours.sat.breakTime,
      breakEndTime: hours.sat.breakEndTime,
    },
    sun: {
      openingHours: hours.sun.openingHours,
      closingHours: hours.sun.closingHours,
      breakTime: hours.sun.breakTime,
      breakEndTime: hours.sun.breakEndTime,
    },
  };

  const [allDay, setAllDay] = useState<all_inter>({
    ALLDAY: {
      openingHours: hours.mon.openingHours,
      closingHours: hours.mon.closingHours,
      breakTime: hours.mon.breakTime,
      breakEndTime: hours.mon.breakEndTime,
    },
  });
  const [weekDay, setWeekDay] = useState<week_inter>({
    WEEKDAY: {
      openingHours: hours.mon.openingHours,
      closingHours: hours.mon.closingHours,
      breakTime: hours.mon.breakTime,
      breakEndTime: hours.mon.breakEndTime,
    },
    WEEKEND: {
      openingHours: hours.sat.openingHours,
      closingHours: hours.sat.closingHours,
      breakTime: hours.sat.breakTime,
      breakEndTime: hours.sat.breakEndTime,
    },
  });
  const [diffDay, setDiffDay] = useState<diff_inter>({
    mon: {
      openingHours: hours.mon.openingHours,
      closingHours: hours.mon.closingHours,
      breakTime: hours.mon.breakTime,
      breakEndTime: hours.mon.breakEndTime,
    },
    tue: {
      openingHours: hours.tue.openingHours,
      closingHours: hours.tue.closingHours,
      breakTime: hours.tue.breakTime,
      breakEndTime: hours.tue.breakEndTime,
    },
    wed: {
      openingHours: hours.wed.openingHours,
      closingHours: hours.wed.closingHours,
      breakTime: hours.wed.breakTime,
      breakEndTime: hours.wed.breakEndTime,
    },
    thu: {
      openingHours: hours.thu.openingHours,
      closingHours: hours.thu.closingHours,
      breakTime: hours.thu.breakTime,
      breakEndTime: hours.thu.breakEndTime,
    },
    fri: {
      openingHours: hours.fri.openingHours,
      closingHours: hours.fri.closingHours,
      breakTime: hours.fri.breakTime,
      breakEndTime: hours.fri.breakEndTime,
    },
    sat: {
      openingHours: hours.sat.openingHours,
      closingHours: hours.sat.closingHours,
      breakTime: hours.sat.breakTime,
      breakEndTime: hours.sat.breakEndTime,
    },
    sun: {
      openingHours: hours.sun.openingHours,
      closingHours: hours.sun.closingHours,
      breakTime: hours.sun.breakTime,
      breakEndTime: hours.sun.breakEndTime,
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
    if (e.target.name.split("_")[1] === "closingHours") {
      console.log("opening IN");
      console.log(dayjs(allDay.ALLDAY.openingHours));
      // if (dayjs(allDay.ALLDAY.openingHours).diff(e.target.value) < 0) {
      //   console.log("opening error!!");
      // }
    } else if (e.target.name.split("_")[1] === "breakEndTime") {
      console.log("break IN");
      // if (dayjs(allDay.ALLDAY.breakTime).diff(e.target.value) < 0) {
      //   console.log("break error!!");
      // }
    }

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
      case "mon":
        value = diffDay.mon;
        break;
      case "tue":
        value = diffDay.tue;
        break;
      case "wed":
        value = diffDay.wed;
        break;
      case "thu":
        value = diffDay.thu;
        break;
      case "fri":
        value = diffDay.fri;
        break;
      case "sat":
        value = diffDay.sat;
        break;
      case "sun":
        value = diffDay.sun;
        break;

      default:
        null;
    }
    return (
      <>
        <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`}>
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
              <Inputlayout id="mon" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>화요일</Text>
              <Inputlayout id="tue" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>수요일</Text>
              <Inputlayout id="wed" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>목요일</Text>
              <Inputlayout id="thu" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>금요일</Text>
              <Inputlayout id="fri" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>토요일</Text>
              <Inputlayout id="sat" />
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} padding={`30px 0px 0px`}>
              <Text margin={`18px 10px 0px 0px`}>일요일</Text>
              <Inputlayout id="sun" />
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
              name="mon"
              checked={booking.dayOff.includes("mon")}
              kindOf={booking.dayOff.includes("mon") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              월
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="tue"
              checked={booking.dayOff.includes("tue")}
              kindOf={booking.dayOff.includes("tue") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              화
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="wed"
              checked={booking.dayOff.includes("wed")}
              kindOf={booking.dayOff.includes("wed") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              수
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="thu"
              checked={booking.dayOff.includes("thu")}
              kindOf={booking.dayOff.includes("thu") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              목
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="fri"
              checked={booking.dayOff.includes("fri")}
              kindOf={booking.dayOff.includes("fri") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              금
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="sat"
              checked={booking.dayOff.includes("sat")}
              kindOf={booking.dayOff.includes("sat") ? `hollyDay` : `ghost`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dayOffHandler(e);
              }}
            >
              토
            </SelectDays>
            <SelectDays
              disabled={!modify}
              name="sun"
              checked={booking.dayOff.includes("sun")}
              kindOf={booking.dayOff.includes("sun") ? `hollyDay` : `ghost`}
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
                let data = {
                  ...booking,
                  officeHour: JSON.stringify(hoursData),
                };
                deleteKeyJson(data);

                console.log("###", data);

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
