'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import '@/styles/stylesheetsfromdatepicker/datepicker.scss';
import ko from 'date-fns/locale/ko'; // 한국어 locale import
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale import
import { Locale } from 'date-fns'; // Locale 타입 import

// dayjs에 한국어 locale 적용
dayjs.locale('ko');

// react-datepicker에 한국어 locale 등록
registerLocale('ko', ko as unknown as Locale); // Locale 타입으로 변환

const MainSearchDate = () => {
  const [startDate, setStartDate] = useState(dayjs().toDate());
  const [endDate, setEndDate] = useState(dayjs().toDate());

  return (
    <DateWrapper>
      <DateWithTextWrapper>
        <DatePickerWrapper>
          <Label>숙박 시작일</Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              const newStartDate = dayjs(date).toDate();
              setStartDate(newStartDate);
              if (newStartDate > endDate) {
                setEndDate(dayjs(newStartDate).add(0, 'day').toDate());
              }
            }}
            inline // 달력을 항상 보이게 하는 속성
            locale="ko" // locale prop 추가
            dateFormat="yyyy년 MM월 dd일" // 한국어 형식으로 날짜 표시
          />
        </DatePickerWrapper>
        <DatePickerWrapper>
          <Label>숙박 종료일</Label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(dayjs(date).toDate())}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            inline
            locale="ko"
            dateFormat="yyyy년 MM월 dd일"
          />
        </DatePickerWrapper>
      </DateWithTextWrapper>
    </DateWrapper>
  );
};

const DateWrapper = styled.div`
  width: 590px;
  height: 404px;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DateWithTextWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
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
