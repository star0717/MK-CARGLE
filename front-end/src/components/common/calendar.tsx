import { NextPage } from "next";
import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Wrapper } from "../styles/CommonComponents";

interface CalendarProps {
  schedule: string;
  setSchedule: React.Dispatch<React.SetStateAction<string>>;
}

const Calendar: NextPage<CalendarProps> = (props) => {
  const [day, setDay] = useState(new Date()); // 날짜 state

  const modifiers = {
    toDay: new Date(),
    selectDay: day,
  };
  const modifiersStyles = {
    toDay: {
      color: "white",
      backgroundColor: "red",
    },
    selectDay: {
      border: "1.5px solid red",
      boxSizing: "border-box",
    },
  };

  // 날짜 클릭 이벤트
  const handleDayClick = (day: any) => {
    setDay(day);
    props.setSchedule(`${day.toLocaleDateString()} 일정`);
  };
  return (
    <Wrapper>
      <DayPicker
        onDayClick={handleDayClick}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
      {/* <p>{day ? day.toLocaleDateString() : "Please select a day 👻"}</p> */}
    </Wrapper>
  );
};

export default Calendar;

// export default class Example extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleDayClick = this.handleDayClick.bind(this);
//     this.state = {
//       selectedDay: null,
//     };
//   }

//   handleDayClick(day, { selected }) {
//     this.setState({
//       selectedDay: selected ? undefined : day,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <DayPicker
//           selectedDays={this.state.selectedDay}
//           onDayClick={this.handleDayClick}
//         />
//         <p>
//           {this.state.selectedDay
//             ? this.state.selectedDay.toLocaleDateString()
//             : 'Please select a day 👻'}
//         </p>
//       </div>
//     );
//   }
// }
