import React, { useState } from 'react';
import styled from 'styled-components';
import Buttons from '../Buttons';

interface SearchPeopleNumberProps {
  onConfirm: (adultCount: number, kidCount: number) => void;
}

const SearchPeopleNumber: React.FC<SearchPeopleNumberProps> = ({
  onConfirm,
}) => {
  const [adultCount, setAdultCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);

  const incrementAdult = () => setAdultCount(adultCount + 1);
  const decrementAdult = () =>
    setAdultCount(adultCount > 0 ? adultCount - 1 : 0);

  const incrementKid = () => setKidCount(kidCount + 1);
  const decrementKid = () => setKidCount(kidCount > 0 ? kidCount - 1 : 0);

  const confirmPeople = () => {
    onConfirm(adultCount, kidCount);
  };

  return (
    <PeopleCounterWrapper>
      <PeopleCounter>
        <AdultAndKid>
          <Label>성인</Label>
          <CountWrapper>
            <CountButton onClick={decrementAdult}>–</CountButton>
            <CountNumber>{adultCount}</CountNumber>
            <CountButton onClick={incrementAdult}>+</CountButton>
          </CountWrapper>
        </AdultAndKid>
        <AdultAndKid>
          <Label>어린이</Label>
          <CountWrapper>
            <CountButton onClick={decrementKid}>–</CountButton>
            <CountNumber>{kidCount}</CountNumber>
            <CountButton onClick={incrementKid}>+</CountButton>
          </CountWrapper>
        </AdultAndKid>
      </PeopleCounter>
      <Buttons
        label="인원 확인"
        onClick={confirmPeople}
        fullWidth={false}
        fullHeight={false}
      />
    </PeopleCounterWrapper>
  );
};

const PeopleCounterWrapper = styled.div`
  width: 590px;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  background-color: #f7f7f7;
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  top: 70px;
  right: 0;
  z-index: 100;
`;

const PeopleCounter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const AdultAndKid = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #111111;
  padding: 10px 0;
`;

const CountButton = styled.div`
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 0.85;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const CountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;

  &:last-child {
    justify-content: end;
  }
`;

const CountNumber = styled.div`
  width: 50px;
  text-align: center;
`;

const Label = styled.div`
  width: 50px;
  font-weight: 700;
  white-space: nowrap;
`;

export default SearchPeopleNumber;
