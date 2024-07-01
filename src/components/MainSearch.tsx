'use client';

import React from 'react';
import styled from 'styled-components';
import Buttons from './Buttons';

function MainSearch(): React.JSX.Element {
  return (
    <div>
      <SearchWrapper>
        <SearchTitle>검색하기</SearchTitle>
        <SearchElementsWrapper>
          <p>지역</p>
          <SearchSelector>지역 선택하기</SearchSelector>
        </SearchElementsWrapper>
        <SearchElementsWrapper>
          <p>인원</p>
          <SearchSelector>인원수 선택하기</SearchSelector>
        </SearchElementsWrapper>
        <SearchElementsWrapper>
          <p>날짜</p>
          <SearchSelector>체크인, 체크아웃 날짜 선택하기</SearchSelector>
        </SearchElementsWrapper>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Buttons label="등록" fullWidth={false} />
        </div>
      </SearchWrapper>
    </div>
  );
}

const SearchWrapper = styled.div`
  width: 750px;
  min-width: 500px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.65);  
  @media only screen and (max-width: 1440px) {
    width: 500px;
  }
  @media only screen and (max-width: 1080px) {
    width: 100%;
    padding: 20px;
  }
`;

const SearchTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  padding-bottom: 50px;
  @media only screen and (max-width: 1080px) {
    font-size: 24px;
    padding-bottom: 30px;
  }
`;

const SearchElementsWrapper = styled.div`
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1080px) {
    padding-bottom: 20px;
  }
  p {
    width: 80px;
    font-size: 23px;
    @media only screen and (max-width: 1080px) {
      width: 70px;
      font-size: 20px;
    }
  }
`;

const SearchSelector = styled.div`
  width: 100%;
  height: 3.5rem;
  background-color: #ffffff;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1080px) {
    height: 3rem;
    padding-left: 0.5rem;
  }
`;

export default MainSearch;
