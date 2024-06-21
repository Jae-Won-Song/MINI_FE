import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface HeaderProps {
  currentMonth: dayjs.Dayjs;
  nextMonth: dayjs.Dayjs;
  prevMonth: () => void;
  nextMonthFunc: () => void;
  resetMonth: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentMonth, nextMonth, prevMonth, nextMonthFunc, resetMonth }) => {
  return (
    <HeaderContainer>
      <Button onClick={prevMonth} aria-label="Previous Month">&lt;</Button>
      <span>
        {currentMonth.format('YYYY년 M월')} ~ {nextMonth.format('YYYY년 M월')}
      </span>
      <Button onClick={nextMonthFunc} aria-label="Next Month">&gt;</Button>
      {/* <Button onClick={resetMonth}>이번 달</Button> */}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 94px;
  width: 100%;
  align-items: center;  
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 700;
  position: relative;
  span {
    margin: auto;
  }
`;

const Button = styled.button`  
  width: 20px;
  height: 20px;
  font-size: 1.1rem;
  background-color: transparent;
  color: #7a7a7a;
  border: none;
  cursor: pointer;
  position: absolute;

  &:first-child {
    left: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:last-child {
    right: 0;
  }
`;

export default Header;
