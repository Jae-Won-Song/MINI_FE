// 'use client';

// import { useState } from 'react';
// import styled from 'styled-components';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// interface DateRangePickerProps {
//   startDate: Date;
//   endDate: Date;
//   onStartDateChange: (date: Date) => void;
//   onEndDateChange: (date: Date) => void;
// }

// const DateRangePicker = ({
//   startDate,
//   endDate,
//   onStartDateChange,
//   onEndDateChange,
// }: DateRangePickerProps) => {
//   return (
//     <DateSelection>
//       <StyledDatePicker
//         selected={startDate}
//         onChange={(date: Date | null) => onStartDateChange(date || new Date())}
//         selectsStart
//         startDate={startDate}
//         endDate={endDate}
//         dateFormat="yy년 MM월 dd일"
//       />
//       <span>~</span>
//       <StyledDatePicker
//         selected={endDate}
//         onChange={(date: Date | null) => onEndDateChange(date || new Date())}
//         selectsEnd
//         startDate={startDate}
//         endDate={endDate}
//         minDate={startDate}
//         dateFormat="yy년 MM월 dd일"
//       />
//     </DateSelection>
//   );
// };

// export default DateRangePicker;

// const DateSelection = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;

//   .react-datepicker-wrapper {
//     width: auto;
//   }
// `;

// const StyledDatePicker = styled(DatePicker)`
//   width: 150px;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
//   margin: 0 10px;
//   cursor: pointer;

//   .react-datepicker__input-container input {
//     width: 100%;
//     border: none;
//   }

//   .react-datepicker {
//     font-size: 16px;
//   }

//   .react-datepicker__header {
//     background-color: #f85b2b;
//     border-bottom: none;
//   }

//   .react-datepicker__current-month {
//     color: white;
//   }

//   .react-datepicker__day--selected {
//     background-color: #f85b2b;
//   }

//   .react-datepicker__day--keyboard-selected {
//     background-color: #f85b2b;
//   }
// `;
