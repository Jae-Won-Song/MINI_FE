'use client';

import React from 'react';
// import DatePicker from 'react-datepicker';
// import dayjs from 'dayjs';
import styled from 'styled-components';

function MainSearch(): React.JSX.Element {
  return (
    <div>
      <SearchWrapper>
        <SearchTitle>검색하기</SearchTitle>
        <SearchElementsWrapper>
          <p>지역</p>
          <SelectorWrapper><p>지역 선택하기</p></SelectorWrapper>
        </SearchElementsWrapper>
        <SearchElementsWrapper>
          <p>인원</p>
          <SelectorWrapper><p>인원수 선택하기</p></SelectorWrapper>
        </SearchElementsWrapper>
        <SearchElementsWrapper>
          <p>날짜</p>
          <SelectorWrapper>
            <SelectorDate>체크인</SelectorDate>
            <p style={{textAlign: 'center'}}>~</p>
            <SelectorDate>체크아웃</SelectorDate>
          </SelectorWrapper>
        </SearchElementsWrapper>
      </SearchWrapper>
    </div>
  );
}

const SearchWrapper = styled.div`
  width: 750px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.65);
`;

const SearchTitle = styled.div`
  font-size: 1.875rem;
  font-weight: 900;
  padding-bottom: 50px;
`;

const SearchElementsWrapper = styled.div`
  width: 750px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    flex-grow: 0.5;
    flex-basis: 0;
    font-size: 23px;
  }
  div {
    flex-grow: 3;
    flex-basis: 0;
    height: 50px;
    background-color: #ffffff;
  }
`;

const SearchSelector = styled.div`
  
`;

export default MainSearch;
