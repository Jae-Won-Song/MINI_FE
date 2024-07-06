'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SearchRegion from './SearchBanner/SearchRegion';
import SearchDate from './SearchBanner/SearchDate';
import SearchPeopleNumber from './SearchBanner/SearchPeopleNumber';
import Buttons from './Buttons';
import styled, { keyframes, css } from 'styled-components';

interface DateRegionDropdownProps {
  onClose: () => void;
}

const DateRegionDropdown: React.FC<DateRegionDropdownProps> = ({ onClose }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [region, setRegion] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [adultCount, setAdultCount] = useState<number>(0);
  const [kidCount, setKidCount] = useState<number>(0);
  const [routerReady, setRouterReady] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAnimating(true);
        setIsOpen(false);
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, isOpen]);

  useEffect(() => {
    setRouterReady(true);
  }, []);

  const handleSelectRegion = (selectedRegion: string) => {
    setRegion(selectedRegion);
  };

  const handleSelectDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSelectPeopleNumber = (adults: number, kids: number) => {
    setAdultCount(adults);
    setKidCount(kids);
  };

  const handleSearch = async () => {
    const query = `/searchresults?region=${encodeURIComponent(region)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&headcount=${adultCount + kidCount}`;
    if (router) {
      router.push(query);
    }
  };

  if (!routerReady) {
    return null;
  }

  return (
    <>
      {isOpen && <Overlay />}
      <DropdownWrapper ref={dropdownRef}>
        <DropdownButton onClick={handleToggle}>
          여행지를 선택하세요
        </DropdownButton>
        {(isOpen || isAnimating) && (
          <DropdownContentWrapper
            isOpen={isOpen}
            onAnimationEnd={() => setIsAnimating(false)}
          >
            <DropdownContent>
              <SelectedInfo>
                {region && <InfoItem>어디로: {region}</InfoItem>}
                {startDate && endDate && (
                  <InfoItem>
                    언제: {startDate} ~ {endDate}
                  </InfoItem>
                )}
                <InfoItem>
                  몇 명: 성인 {adultCount} 어린이 {kidCount}
                </InfoItem>
              </SelectedInfo>
              <SearchRegion onSelectRegion={handleSelectRegion} />
              <SearchDate onSelectDates={handleSelectDates} />
              <SearchPeopleNumber onConfirm={handleSelectPeopleNumber} />
              <Buttons label="검색" onClick={handleSearch} />
            </DropdownContent>
          </DropdownContentWrapper>
        )}
      </DropdownWrapper>
    </>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const DropdownButton = styled.button`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownContentWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 100;
  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${fadeIn} 0.3s forwards
        `
      : css`
          ${fadeOut} 0.3s forwards
        `};
`;

const DropdownContent = styled.div`
  flex: 1;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
`;

const SelectedInfo = styled.div`
  margin-bottom: 10px;
`;

const InfoItem = styled.div`
  margin-bottom: 5px;
`;

export default DateRegionDropdown;
