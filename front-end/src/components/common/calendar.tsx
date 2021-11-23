import { NextPage } from "next";
import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const Calendar: NextPage = () => {
  const [day, setDay] = useState(new Date());
  const handleDayClick = (day: any) => {
    setDay(day);
  };
  console.log("데이데이 : ", day);
  return (
    <div>
      <DayPicker onDayClick={handleDayClick} />
      {/* <p>{day ? day.toLocaleDateString() : "Please select a day 👻"}</p> */}
    </div>
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
