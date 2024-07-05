'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Header from './Header';
import Month from './DaysMonth';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

interface CalendarProps {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  onDateClick: (date: dayjs.Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  startDate,
  endDate,
  onDateClick,
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().tz());
  const [nextMonth, setNextMonth] = useState(dayjs().tz().add(1, 'month'));
  const maxMonth = dayjs().tz().add(24, 'month');

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setNextMonth(nextMonth.subtract(1, 'month'));
  };

  const nextMonthFunc = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    setNextMonth(nextMonth.add(1, 'month'));
  };

  return (
    <CalendarContainer>
      <Header
        currentMonth={currentMonth}
        nextMonth={nextMonth}
        maxMonth={maxMonth}
        prevMonth={prevMonth}
        nextMonthFunc={nextMonthFunc}
      />
      <MonthsContainer>
        <Month
          month={currentMonth}
          startDate={startDate}
          endDate={endDate}
          onDateClick={onDateClick}
        />
        <Month
          month={nextMonth}
          startDate={startDate}
          endDate={endDate}
          onDateClick={onDateClick}
        />
      </MonthsContainer>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  height: 305px;
  display: flex;
  flex-direction: column;
`;

const MonthsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11px;
  justify-content: center;
`;

export default Calendar;
