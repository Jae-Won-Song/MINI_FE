import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useRouter } from 'next/navigation';
import SearchDate from './SearchBanner/SearchDate';
import SearchRegion from './SearchBanner/SearchRegion';
import SearchPeopleNumber from './SearchBanner/SearchPeopleNumber';
import Buttons from './Buttons';

interface DateRegionDropdownProps {
  onClose: () => void;
}

const DateRegionDropdown: React.FC<DateRegionDropdownProps> = ({ onClose }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [adultCount, setAdultCount] = useState<number>(0);
  const [kidCount, setKidCount] = useState<number>(0);
  const [routerReady, setRouterReady] = useState(false);
  const [showDateWarning, setShowDateWarning] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedPart, setSelectedPart] = useState<
    '지역' | '날짜' | '인원' | '검색'
  >('지역');

  useEffect(() => {
    setRouterReady(true);
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsAnimating(true);
      setIsOpen(false);
    }
  }, []);

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

  const handleSelectRegion = (selectedRegion: string) => {
    setSelectedRegion(selectedRegion);
    setSelectedPart('날짜');
    setIsAnimating(true); // 다음 단계로 애니메이션 시작
  };

  const handleSelectDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setDateSelected(true);
    setShowDateWarning(false);
    setSelectedPart('인원');
    setIsAnimating(true);
  };

  const handleSelectPeopleNumber = (adults: number, kids: number) => {
    setAdultCount(adults);
    setKidCount(kids);
    setSelectedPart('검색');
    setIsAnimating(true);
  };

  const handleSearch = async () => {
    if (!dateSelected) {
      setShowDateWarning(true);
      return;
    }
    const query = `/searchresults?region=${encodeURIComponent(
      selectedRegion,
    )}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(
      endDate,
    )}&headcount=${adultCount + kidCount}`;
    if (router) {
      router.push(query);
    }
  };

  const isSearchButtonVisible = selectedRegion && startDate && endDate;

  return (
    <>
      <Overlay isOpen={isOpen} />
      <DropdownWrapper ref={dropdownRef}>
        <DropdownButton onClick={handleToggle}>
          <ButtonText selected={selectedPart === '지역'}>
            {selectedRegion || '지역'}
          </ButtonText>
          <Divider />
          <ButtonText selected={selectedPart === '날짜'}>
            {startDate && endDate ? `${startDate} ~ ${endDate}` : '날짜'}
          </ButtonText>
          <Divider />
          <ButtonText selected={selectedPart === '인원'}>
            {adultCount || kidCount
              ? `성인 ${adultCount}명, 어린이 ${kidCount}명`
              : '인원'}
          </ButtonText>
        </DropdownButton>
        <DropdownContentWrapper
          isOpen={isOpen}
          onAnimationEnd={() => setIsAnimating(false)}
        >
          {isOpen && (
            <DropdownContent>
              <SearchRegionWrapper visible={selectedPart === '지역'}>
                <SearchRegion onSelectRegion={handleSelectRegion} />
              </SearchRegionWrapper>
              <SearchDateWrapper visible={selectedPart === '날짜'}>
                <SearchDate onSelectDates={handleSelectDates} />
              </SearchDateWrapper>
              <SearchPeopleNumberWrapper visible={selectedPart === '인원'}>
                <SearchPeopleNumber onConfirm={handleSelectPeopleNumber} />
              </SearchPeopleNumberWrapper>
              {selectedPart === '검색' && isSearchButtonVisible && (
                <Buttons
                  label="검색"
                  fullWidth={false}
                  fullHeight={false}
                  onClick={handleSearch}
                />
              )}
              {showDateWarning && (
                <WarningMessage>여행 일정을 확인해주세요.</WarningMessage>
              )}
            </DropdownContent>
          )}
        </DropdownContentWrapper>
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

const DropdownButton = styled.div`
  width: 40vw;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-radius: 16px;
  margin: 10% 0 10% 0;
  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
`;

const ButtonText = styled.span<{ selected: boolean }>`
  position: relative;
  padding: 0 10px;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 1px;
  height: 60%;
  background-color: #ececec;
`;

const DropdownContentWrapper = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen
      ? css`
          animation: ${fadeIn} 0.3s forwards;
        `
      : css`
          animation: ${fadeOut} 0.7s forwards;
        `}
`;

const DropdownContent = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  padding: 20px;
  z-index: 100;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
`;

const WarningMessage = styled.div`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

const SearchRegionWrapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const SearchDateWrapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const SearchPeopleNumberWrapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

export default DateRegionDropdown;
