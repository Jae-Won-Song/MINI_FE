import React from 'react';
import styled from 'styled-components';

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

const DaysRow: React.FC = () => {
  return (
    <DaysRowContainer>
      {dayNames.map((day, index) => (
        <DaysColumn key={index}>
          {day}
        </DaysColumn>
      ))}
    </DaysRowContainer>
  );
};

const DaysRowContainer = styled.div`
  width: 100%;
  display: flex;
  color: #F85B2B;
  font-weight: 900;
  justify-content: space-between;
`;

const DaysColumn = styled.div`
  flex: 1;
  display: flex;
  padding: 8px 11px;
`;

export default DaysRow;
