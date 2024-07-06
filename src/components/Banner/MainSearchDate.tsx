<<<<<<< HEAD
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Calendar from '../Calendar/Calendar';
import Buttons from '../Buttons';

const MainSearchDate: React.FC = () => {
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

  return (
    <DateWrapper>
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
            <TotalNights>
              {calculateNights() === 0 ? '당일' : `${calculateNights()}박`}
            </TotalNights>
          )}
        </TotalNightsWrapper>
      </StayAndNightsWrapper>
      <Buttons label="확인" fullWidth={false} fullHeight={false} />
    </DateWrapper>
  );
};

const DateWrapper = styled.div`
  width: 590px;
=======
'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import '@/styles/stylesheetsfromdatepicker/datepicker.scss'
import ko from 'date-fns/locale/ko'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { Locale } from 'date-fns'
<<<<<<<< HEAD:src/components/MainSearchDate.tsx
========
import Calendar from '../Calendar/Calendar'
>>>>>>>> b0926d1 (rename: component의 banner 폴더 추가):src/components/Banner/MainSearchDate.tsx

dayjs.locale('ko')
registerLocale('ko', ko as unknown as Locale)

const MainSearchDate = () => {
  const [startDate, setStartDate] = useState(dayjs().toDate());
  const [endDate, setEndDate] = useState(dayjs().add(0, 'day').toDate());
  const [startMonth, setStartMonth] = useState(dayjs().month());
  const [endMonth, setEndMonth] = useState(dayjs().add(1, 'month').month());

  const handleStartMonthChange = (date) => {
    const newMonth = dayjs(date).month();
    setStartMonth(newMonth);
    setEndMonth(newMonth);
  };

  const handleEndMonthChange = (date) => {
    const newMonth = dayjs(date).month();
    setEndMonth(newMonth);
  };

  return (
    <>
      <DateWrapperForStart>
        <DatePickerWrapper>
          <Label>숙박 시작일</Label>
          <DatePicker 
            selected={startDate} 
            onChange={date => setStartDate(date)} 
            selectsStart
            startDate={startDate}
            endDate={endDate}
            inline
            onMonthChange={handleStartMonthChange}
            locale="ko" // locale prop 추가
            dateFormat="yyyy년 MM월 dd일" // 한국어 형식으로 날짜 표시
          />
        </DatePickerWrapper>
      </DateWrapperForStart>
      <DateWrapperForEnd>
        <DatePickerWrapper>
          <Label>숙박 종료일</Label>
          <DatePicker 
            selected={endDate} 
            onChange={date => setEndDate(date)} 
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            inline
            onMonthChange={handleEndMonthChange}
            openToDate={new Date(dayjs(startDate).year(), endMonth)}
            locale="ko" // locale prop 추가
            dateFormat="yyyy년 MM월 dd일" // 한국어 형식으로 날짜 표시
          />
        </DatePickerWrapper>
      </DateWrapperForEnd>
    </>
  )
}

const DateWrapperForStart = styled.div`
  width: fit-content;
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 45px;
  display: flex;
<<<<<<< HEAD
  flex-direction: column;
  align-items: center;
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
`;
const TotalNights = styled.p`
  margin-top: 10px;
  font-weight: 700;
  &:first-child {
    width: fit-content;
    font-weight: 400;
  }
`;

export default MainSearchDate;
=======
  flex-direction: row;
  align-items: center;
`
const DateWrapperForEnd = styled.div`
  width: fit-content;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`

export default MainSearchDate
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)
