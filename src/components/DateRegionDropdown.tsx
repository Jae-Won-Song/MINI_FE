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
  const [selectedPart, setSelectedPart] = useState<'지역' | '날짜' | '인원'>('지역');

  useEffect(() => {
    setRouterReady(true);
  }, []);

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
      }
    },
    [],
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

  const handleSelectRegion = (selectedRegion: string) => {
    setSelectedRegion(selectedRegion);
    setSelectedPart('날짜');
    setIsAnimating(true); // 다음 단계로 애니메이션 시작
  };

  const handleSelectDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setDateSelected(true); // 날짜 선택됨
    setShowDateWarning(false); // 경고 메시지 숨김
    setSelectedPart('인원');
    setIsAnimating(true); // 다음 단계로 애니메이션 시작
  };

  const handleSelectPeopleNumber = (adults: number, kids: number) => {
    setAdultCount(adults);
    setKidCount(kids);
    setSelectedPart('검색');
    setIsAnimating(true); // 다음 단계로 애니메이션 시작
  };

  const handleSearch = async () => {
    if (!dateSelected) {
      setShowDateWarning(true); // 날짜 선택하지 않았을 때 경고 메시지 표시
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

  // 검색 버튼을 보여주는 조건 설정
  const isSearchButtonVisible = selectedRegion && startDate && endDate;

  return (
    <>
      <Overlay isOpen={isOpen} />
      <DropdownWrapper ref={dropdownRef}>
        <DropdownButton onClick={handleToggle}>
          <ButtonText selected={selectedPart === '지역'}>{selectedRegion || '지역'}</ButtonText>
          <ButtonText selected={selectedPart === '날짜'}>{startDate && endDate ? `${startDate} ~ ${endDate}` : '날짜'}</ButtonText>
          <ButtonText selected={selectedPart === '인원'}>{adultCount || kidCount ? `성인 ${adultCount}명, 어린이 ${kidCount}명` : '인원'}</ButtonText>
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
              {/* 검색 버튼이 항상 보이도록 설정 */}
              {selectedPart === '검색' && isSearchButtonVisible && (
                <Buttons
                  label="검색"
                  fullWidth={false}
                  fullHeight={false}
                  onClick={handleSearch}
                />
              )}
              {/* 날짜 선택 경고 메시지 */}
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
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-radius: 16px;
  border: 1px solid $lightgrey;
  margin: 10% 0 10% 0;
  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative; /* 부모 요소로 설정 */
`;

const ButtonText = styled.span<{ selected: boolean }>`
  position: relative;
  padding: 0 10px;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    transform: translateY(-50%);
    width: 1px;
    height: 60%;
    background-color: ${({ selected }) => (selected ? 'black' : 'transparent')};
  }

  &:last-child::after {
    display: none; /* 마지막 버튼 뒤에는 구분선을 표시하지 않음 */
  }
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
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  /* top: 50px; */
  left: 50%;
  transform: translateX(-50%);
  /* background-color: white; */
  /* border: 1px solid #ddd; */
  border-radius: 5px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
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
