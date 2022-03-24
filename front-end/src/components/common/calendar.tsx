import { NextPage } from "next";
import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import {
  Text,
  Wrapper,
  SmallButton,
  IconButton,
} from "../styles/CommonComponents";
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/ko";
import {
  RiArrowLeftFill,
  RiArrowLeftSFill,
  RiArrowRightSFill,
} from "react-icons/ri";
import dayjs from "dayjs";

interface CalendarProps {
  schedule: string;
  setSchedule: React.Dispatch<React.SetStateAction<string>>;
}

const Calendar: NextPage<CalendarProps> = (props) => {
  const [day, setDay] = useState(new Date()); // 날짜 state

  const modifiers = {
    toDay: new Date(),
    selectDay: day,
    Days: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
  };
  const modifiersStyles = {
    toDay: { color: "white", backgroundColor: "#314FA5" },
    selectDay: {
      backgroundColor: "#8DAFCE",
      color: "#fff",
    },
    Days: {
      padding: "14px",
    },
  };

  //요일
  const MONTHS = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  // const WEEKDAYS_LONG = [
  //   "Domenica",
  //   "Lunedì",
  //   "Martedì",
  //   "Mercoledì",
  //   "Giovedì",
  //   "Venerdì",
  //   "Sabato",
  // ];

  const weekday = ({ weekday, className, localeUtils, locale }: any) => {
    const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
    return (
      <Text className={className} title={weekdayName} width={`auto`}>
        {weekdayName.slice(0, 1)}
      </Text>
    );
  };

  const caption = ({ date, className, localeUtils, locale }: any) => {
    const monthTitle = localeUtils.formatMonthTitle(date, locale);

    return (
      <Text className="DayPicker-Caption" title={monthTitle} fontSize={`20px`}>
        {monthTitle}
      </Text>
    );
    // const captionComment = localeUtils.format(caption, locale);
    // return (
    //   <Text
    //     className={className}
    //     title={captionComment}
    //     color={`blue`}
    //     width={`auto`}
    //   >
    //     {caption}
    //   </Text>
    // );
  };

  // captionElement -> 년월
  // navbarElement -> 달력넘기기
  const Navbar = ({
    nextMonth,
    previousMonth,
    onPreviousClick,
    onNextClick,
    className,
    localeUtils,
  }: any) => {
    return (
      <Wrapper
        className={className}
        dr={`row`}
        ju={`space-around`}
        isAbsolute={true}
        top={`4px`}
        notAnimate
      >
        <Text fontSize={`40px`} onClick={() => onPreviousClick()}>
          <RiArrowLeftSFill />
        </Text>
        <Text fontSize={`40px`} onClick={() => onNextClick()}>
          <RiArrowRightSFill />
        </Text>
      </Wrapper>
    );
  };

  // 날짜 클릭 이벤트
  const handleDayClick = (day: any) => {
    setDay(day);
    props.setSchedule(`${dayjs(day).format("YYYY.MM.DD")} 일정`);
  };
  return (
    <Wrapper padding={`20px`}>
      <DayPicker
        onDayClick={handleDayClick}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        months={MONTHS}
        weekdayElement={weekday}
        captionElement={caption}
        navbarElement={Navbar}
        localeUtils={MomentLocaleUtils}
        locale={`ko`}
      />
    </Wrapper>
  );
};

export default Calendar;
