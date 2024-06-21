'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import '@/styles/stylesheetsfromdatepicker/datepicker.scss'
import ko from 'date-fns/locale/ko'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { Locale } from 'date-fns'
import Calendar from './Calendar/Calendar'

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
      {/* <DateWrapperForStart>
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
      </DateWrapperForEnd> */}
      <DateWrapperForStart>
        <DatePickerWrapper>
          <Calendar />
        </DatePickerWrapper>
      </DateWrapperForStart>
    </>
  )
}

const DateWrapperForStart = styled.div`
  width: 590px;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`
const DateWrapperForEnd = styled.div`
  width: 590px;
  height: 400px;
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
