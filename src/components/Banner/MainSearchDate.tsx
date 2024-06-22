'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Calendar from '../Calendar/Calendar';

const MainSearchDate: React.FC = () => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateClick = (date: dayjs.Dayjs) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate && (date.isSame(startDate, 'day') || date.isAfter(startDate))) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const calculateNights = () => {
    if (startDate && endDate) {
      return endDate.diff(startDate, 'day');
    }
    return 0;
  };

  return (
    <>
      <DateWrapper>
        <Calendar startDate={startDate} endDate={endDate} onDateClick={handleDateClick} />
        <LengthOfStayWrapper>
          <LengthOfStay>
            <p>체크인</p>
            <p>{startDate && <SelectedDate>{startDate.format('YYYY년 M월 D일')}</SelectedDate>}</p>
          </LengthOfStay>
          <LengthOfStay>
            <p>체크아웃</p>
            <p>{endDate && <SelectedDate>{endDate.format('YYYY년 M월 D일')}</SelectedDate>}</p>
          </LengthOfStay>
        </LengthOfStayWrapper>
        <TotalNightsWrapper>
          <TotalNights>숙박일 수</TotalNights>
          {startDate && endDate && (            
            <TotalNights>
              {calculateNights() === 0 ? '당일' : `${calculateNights()}박`}
            </TotalNights>
          )}
        </TotalNightsWrapper>
      </DateWrapper>
    </>
  );
};

const DateWrapper = styled.div`  
  width: 590px;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: column;  
  margin: auto;
`;

const LengthOfStayWrapper = styled.div`  
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: center;
`
const LengthOfStay = styled.div`
  width: 40%;
  padding-bottom: 2px;
  font-weight: 400;
  display: flex;
  flex-direction: row;  
  justify-content: space-between;
  border-bottom: 1px solid;  
`;

const SelectedDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

const TotalNightsWrapper = styled.div`
  margin-top: 10px;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: space-between;  
  width: 24%;
  padding-bottom: 2px;
  border-bottom: 1px solid;
`
const TotalNights = styled.p`  
  margin-top: 10px;
  font-weight: 700;  
  &:first-child {
    width: fit-content;
    font-weight: 400;
  }
`;

export default MainSearchDate;
