'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Calendar from '../Calendar/Calendar';
import Buttons from '../Buttons';

interface MainSearchDateProps {
  onConfirm: (
    startDate: dayjs.Dayjs | null,
    endDate: dayjs.Dayjs | null,
  ) => void;
}

const MainSearchDate: React.FC<MainSearchDateProps> = ({ onConfirm }) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateClick = (date: dayjs.Dayjs) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (
      startDate &&
      !endDate &&
      (date.isSame(startDate, 'day') || date.isAfter(startDate))
    ) {
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

  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleConfirmClick = () => {
    onConfirm(startDate, endDate);
  };

  return (
    <DateWrapper onClick={handleWrapperClick}>
      <Calendar
        startDate={startDate}
        endDate={endDate}
        onDateClick={handleDateClick}
      />
      <StayAndNightsWrapper>
        <LengthOfStayWrapper>
          <LengthOfStay>
            <p>체크인</p>
            <p>
              {startDate && (
                <SelectedDate>
                  {startDate.format('YYYY년 M월 D일')}
                </SelectedDate>
              )}
            </p>
          </LengthOfStay>
          <LengthOfStay>
            <p>체크아웃</p>
            <p>
              {endDate && (
                <SelectedDate>{endDate.format('YYYY년 M월 D일')}</SelectedDate>
              )}
            </p>
          </LengthOfStay>
        </LengthOfStayWrapper>
        <TotalNightsWrapper>
          <TotalNights>숙박일 수</TotalNights>
          {startDate && endDate && (
            <TotalNights style={{ fontSize: '1rem' }}>
              {calculateNights() === 0 ? '당일' : `${calculateNights()}박`}
            </TotalNights>
          )}
        </TotalNightsWrapper>
      </StayAndNightsWrapper>
      <Buttons
        label="기간 확인"
        fullWidth={false}
        fullHeight={false}
        onClick={handleConfirmClick}
      />
    </DateWrapper>
  );
};

const DateWrapper = styled.div`
  width: 590px;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  background-color: #f7f7f7;
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 70px;
  right: 0;
  z-index: 100;
`;

const StayAndNightsWrapper = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

const LengthOfStayWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: center;
`;

const LengthOfStay = styled.div`
  width: 40%;
  padding-bottom: 2px;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid;
  p {
    font-size: 1rem;
  }
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
  border-bottom: 1px solid #111111;
  font-size: 1rem;
`;

const TotalNights = styled.p`
  margin-top: 10px;
  font-weight: 700;
  font-size: 1rem;
  &:first-child {
    font-size: 1rem;
    width: fit-content;
    font-weight: 400;
  }
`;

export default MainSearchDate;
