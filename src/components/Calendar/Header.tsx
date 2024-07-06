import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface HeaderProps {
  currentMonth: dayjs.Dayjs;
  nextMonth: dayjs.Dayjs;
  maxMonth: dayjs.Dayjs;
  prevMonth: () => void;
  nextMonthFunc: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentMonth,
  nextMonth,
  maxMonth,
  prevMonth,
  nextMonthFunc,
}) => {
  const isNextMonthDisabled = nextMonth.isAfter(maxMonth, 'month');
  const isPrevMonthDisabled = currentMonth.isSame(dayjs(), 'month');

  return (
    <HeaderContainer>
      <Button onClick={prevMonth} disabled={isPrevMonthDisabled}>
        &lt;
      </Button>
      <p>
        {currentMonth.format('YYYY년 M월')}
        <span>~</span>
        {nextMonth.format('YYYY년 M월')}
      </p>
      <Button onClick={nextMonthFunc} disabled={isNextMonthDisabled}>
        &gt;
      </Button>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 700;
  position: relative;
  p {
    margin: auto;
    display: flex;
    justify-content: space-between;
  }
  span {
    padding: 0 10px;
  }
  span {
    padding: 0 10px;
  }

`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 20px;
  height: 100%;
  font-size: 1.1rem;
  color: #7a7a7a;
  border: none;
  cursor: pointer;
  position: absolute;

  &:first-child {
    left: 0;
    text-align: start;
  }
  &:last-child {
    right: 0;
    text-align: end;
  }
  &:disabled {
    cursor: default;
    color: transparent;
  }
  &:disabled {
    cursor: default;
    color: transparent;
  }
`;

export default Header;
