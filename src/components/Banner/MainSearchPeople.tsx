import React, { useState } from 'react';
import styled from 'styled-components';

const MainSearchPeople: React.FC = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleAdultChange = (increment: boolean) => {
    setAdults((prev) => (increment ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleChildrenChange = (increment: boolean) => {
    setChildren((prev) => (increment ? prev + 1 : Math.max(0, prev - 1)));
  };

  return (
    <PeopleWrapper>
      <PeopleSection>
        <Label>성인</Label>
        <Button onClick={() => handleAdultChange(false)}>-</Button>
        <Count>{adults}</Count>
        <Button onClick={() => handleAdultChange(true)}>+</Button>
      </PeopleSection>
      <PeopleSection>
        <Label>어린이</Label>
        <Button onClick={() => handleChildrenChange(false)}>-</Button>
        <Count>{children}</Count>
        <Button onClick={() => handleChildrenChange(true)}>+</Button>
      </PeopleSection>
    </PeopleWrapper>
  );
};

const PeopleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const PeopleSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.span`
  flex: 1;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  margin: 0 5px;
`;

const Count = styled.span`
  width: 30px;
  text-align: center;
`;

export default MainSearchPeople;
