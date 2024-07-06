'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import '@/styles/stylesheetsfromdatepicker/datepicker.scss';
import ko from 'date-fns/locale/ko';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Locale } from 'date-fns';

dayjs.locale('ko');
registerLocale('ko', ko as unknown as Locale);

const MainSearchDate = () => {
  const [startDate, setStartDate] = useState<Date>(dayjs().toDate()); // startDate의 타입을 Date로 명시
  const [endDate, setEndDate] = useState<Date>(dayjs().add(0, 'day').toDate()); // endDate의 타입을 Date로 명시
  const [startMonth, setStartMonth] = useState<number>(dayjs().month()); // startMonth의 타입을 number로 명시
  const [endMonth, setEndMonth] = useState<number>(
    dayjs().add(1, 'month').month(),
  ); // endMonth의 타입을 number로 명시

  const handleStartMonthChange = (date: Date) => {
    // date 인자의 타입을 Date로 명시
    const newMonth = dayjs(date).month();
    setStartMonth(newMonth);
    setEndMonth(newMonth);
  };

  const handleEndMonthChange = (date: Date) => {
    // date 인자의 타입을 Date로 명시
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
            onChange={(date) => setStartDate(date as Date)} // date 인자를 Date 타입으로 캐스팅하여 전달
            selectsStart
            startDate={startDate}
            endDate={endDate}
            inline
            onMonthChange={handleStartMonthChange}
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
          />
        </DatePickerWrapper>
      </DateWrapperForStart>
      <DateWrapperForEnd>
        <DatePickerWrapper>
          <Label>숙박 종료일</Label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date as Date)} // date 인자를 Date 타입으로 캐스팅하여 전달
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            inline
            onMonthChange={handleEndMonthChange}
            openToDate={new Date(dayjs(startDate).year(), endMonth)}
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
          />
        </DatePickerWrapper>
      </DateWrapperForEnd>
    </>
  );
};

const DateWrapperForStart = styled.div`
  width: fit-content;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DateWrapperForEnd = styled.div`
  width: fit-content;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

export default MainSearchDate;
