'use client';

import React from 'react';
import styled from 'styled-components';
import Buttons from '../Buttons';

const MainSearch = (): React.JSX.Element => {
  return (
    <div>
      <SearchWrapper>
        <SearchTitle>검색하기</SearchTitle>
        <SearchElementsWrapper>
          <p>지역</p>
          <SelectorWrapper>
            <p>지역 선택하기</p>
          </SelectorWrapper>
        </SearchElementsWrapper>
        <SearchElementsWrapper>
          <p>인원</p>
          <SelectorWrapper>
            <p>인원수 선택하기</p>
          </SelectorWrapper>
        </SearchElementsWrapper>
        <SearchElementsWrapper>
          <p>날짜</p>
          <SelectorWrapper>
            <SelectorDate>체크인</SelectorDate>
            <p style={{ textAlign: 'center' }}>~</p>
            <SelectorDate>체크아웃</SelectorDate>
          </SelectorWrapper>
        </SearchElementsWrapper>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Buttons label="검색" fullWidth={false} />
        </div>
      </SearchWrapper>
    </div>
  );
};

const SearchWrapper = styled.div`
  width: 750px;
  min-width: 500px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.65);
  @media only screen and (max-width: 1440px) {
    width: 600px;
    padding: 30px;
  }
  @media only screen and (max-width: 1080px) {
    width: 100%;
    padding: 20px;
  }
`;

const SearchTitle = styled.div`
  font-size: 1.875rem;
  font-weight: 900;
  padding-bottom: 50px;
  @media only screen and (max-width: 1440px) {
    font-size: 1.5rem;
    padding-bottom: 30px;
  }
`;

const SearchElementsWrapper = styled.div`
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1440px) {
    padding-bottom: 25px;
  }
  @media only screen and (max-width: 1080px) {
    padding-bottom: 20px;
  }
  p {
    width: 80px;
    font-size: 1.438rem;
    font-weight: 700;
    @media only screen and (max-width: 1440px) {
      width: 70px;
      font-size: 1.25rem;
    }
    @media only screen and (max-width: 1080px) {
      width: 70px;
      font-size: 1.2rem;
    }
  }
`;

const SelectorWrapper = styled.div`
  width: 100%;
  height: 56px;
  font-size: 1.2rem;
  background-color: #ffffff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 1440px) {
    height: 3.1rem;
  }
  @media only screen and (max-width: 1080px) {
    height: 3rem;
  }
  p {
    font-size: 1.2rem;
    font-weight: 400;
    padding-left: 0.8rem;
    width: max-content;
    white-space: nowrap;
    @media only screen and (max-width: 1440px) {
      font-size: 1.1rem;
    }
    @media only screen and (max-width: 1080px) {
      font-size: 1rem;
    }
  }
`;

const SelectorDate = styled.div`
  width: 45%;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding-left: 0.8rem;
  @media only screen and (max-width: 1440px) {
    font-size: 1.1rem;
    padding-left: 0.5rem;
  }
  @media only screen and (max-width: 1080px) {
    font-size: 1rem;
    padding-left: 0.5rem;
  }
`;

export default MainSearch;
