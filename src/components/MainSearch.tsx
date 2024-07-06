'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import Buttons from '../Buttons';
// import { FaUmbrellaBeach } from "react-icons/fa";
// import { MdPeopleAlt } from "react-icons/md";
// import { FaRegCalendarAlt } from "react-icons/fa";
import MainSearchRegion from '@/components/Banner/MainSearchRegion';
import MainSearchDate from '@/components/Banner/MainSearchDate';
import MainSearchPeopleNumber from './MainSearchPeopleNumber';

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
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleRegion = () => {
    setIsRegionOpen(!isRegionOpen);
    setIsDateOpen(false); // 날짜 선택기 닫기
    setIsPeopleOpen(false); // 인원 선택기 닫기
  };

  const toggleDate = () => {
    setIsDateOpen(!isDateOpen);
    setIsRegionOpen(false); // 지역 선택기 닫기
    setIsPeopleOpen(false); // 인원 선택기 닫기
  };

  const togglePeople = () => {
    setIsPeopleOpen(!isPeopleOpen);
    setIsRegionOpen(false); // 지역 선택기 닫기
    setIsDateOpen(false); // 날짜 선택기 닫기
  };

  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭이 선택기를 닫지 않도록 함
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region); // 선택된 지역 상태 업데이트
    setIsRegionOpen(false); // 선택 후 드롭다운 닫기
  };

  const handleDateConfirm = (
    startDate: dayjs.Dayjs | null,
    endDate: dayjs.Dayjs | null,
  ) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setIsDateOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsRegionOpen(false);
      setIsPeopleOpen(false);
      setIsDateOpen(false);
    }
  };

  const handlePeopleConfirm = (peopleCount) => {
    setSelectedPeople(`${peopleCount}`);
    setIsPeopleOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SearchWrapper ref={wrapperRef} onClick={handleWrapperClick}>
      <SearchTitle>검색하기</SearchTitle>
      <SearchElementsWrapper>
        <p>지역</p>
        <SelectorWrapper onClick={toggleRegion}>
          <p>{selectedRegion || '지역 선택하기'}</p>
        </SelectorWrapper>
        {isRegionOpen && (
          <MainSearchRegion onSelectRegion={handleRegionSelect} />
        )}
      </SearchElementsWrapper>
      <SearchElementsWrapper>
        <p>날짜</p>
        <SelectorWrapper onClick={toggleDate}>
          <SelectorDate>
            {selectedStartDate
              ? selectedStartDate.format('YYYY년 M월 D일')
              : '체크인'}
          </SelectorDate>
          <p style={{ textAlign: 'center' }}>~</p>
          <SelectorDate>
            {selectedEndDate
              ? selectedEndDate.format('YYYY년 M월 D일')
              : '체크아웃'}
          </SelectorDate>
          {isDateOpen && <MainSearchDate onConfirm={handleDateConfirm} />}
        </SelectorWrapper>
      </SearchElementsWrapper>
      <SearchElementsWrapper>
        <p>인원</p>
        <SelectorWrapper onClick={togglePeople}>
          <p>{selectedPeople || '인원 수 선택하기'}</p>
        </SelectorWrapper>
        {isPeopleOpen && (
          <MainSearchPeopleNumber onConfirm={handlePeopleConfirm} />
        )}
      </SearchElementsWrapper>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Buttons label="검색" fullWidth={false} />
      </div>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  width: 750px;
  min-width: 500px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.65);
  position: relative;
  z-index: 20;
  overflow: visible;
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
  position: relative;

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
