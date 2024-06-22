'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Header from './Header';
import Month from './DaysMonth';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [nextMonth, setNextMonth] = useState(dayjs().add(1, 'month'));

const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setNextMonth(nextMonth.subtract(1, 'month'));
  };

  const nextMonthFunc = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    setNextMonth(nextMonth.add(1, 'month'));
  };

  const resetMonth = () => {
    setCurrentMonth(dayjs());
    setNextMonth(dayjs().add(1, 'month'));
  };

  return (
    <CalendarContainer>
      <Header
        currentMonth={currentMonth}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
        nextMonthFunc={nextMonthFunc}
        resetMonth={resetMonth}
      />
      <MonthsContainer>
        <Month month={currentMonth} />
        <Month month={nextMonth} />
      </MonthsContainer>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
`;

const MonthsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
`;

export default Calendar;
