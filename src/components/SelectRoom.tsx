'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import dayjs, { Dayjs } from 'dayjs';
import Buttons from './Buttons';
import ImageModal from './ImageModal';
import IconsImport from './IconsImport';
import MainSearchDate from './Banner/MainSearchDate';
import RoomAvailability from './RoomAvailability';
import { useDataContext, DataContextProps } from '../contexts/DataContext';

interface SelectRoomProps {
  title: string;
  MaxCount: number;
  fee: number;
  images: string[];
  accommodationId: number;
  roomId: number;
  accommodationTitle: string;
  accommodationImage: string;
  icons: {
    bath: string;
    hometheater: string;
    aircondition: string;
    tv: string;
    pc: string;
    cable: string;
    internet: string;
    refrigerator: string;
    toiletries: string;
    sofa: string;
    cook: string;
    table: string;
    hairdryer: string;
  };
}

const SelectRoom = ({
  title,
  MaxCount,
  fee,
  images,
  accommodationId,
  accommodationTitle,
  roomId,
  accommodationImage,
  icons,
}: SelectRoomProps) => {
  const { setNumberState, setObjectState }: DataContextProps = useDataContext();

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(
    null,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
  const [stayDays, setStayDays] = useState<number>(0);

  const dateRef = useRef<HTMLDivElement>(null);

  const [selectPerson, setSelectPerson] = useState<number>(2);
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentPrice, setcurrentPrice] = useState<number>(fee);
  const [showRoomAvailability, setShowRoomAvailability] =
    useState<boolean>(false);
  const [isReservable, setIsReservable] = useState<boolean>(false);

  const handlePlus = () => {
    if (selectPerson < MaxCount) {
      setSelectPerson(selectPerson + 1);
      setcurrentPrice(currentPrice + 50000);
    }
  };

  const handleMinus = () => {
    if (selectPerson > 2) {
      setSelectPerson(selectPerson - 1);
      setcurrentPrice(currentPrice - 50000);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const toggleDate = () => {
    setIsDateOpen(!isDateOpen);
  };

  const handleDateConfirm = (
    startDate: dayjs.Dayjs | null,
    endDate: dayjs.Dayjs | null,
  ) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setIsDateOpen(false);
    if (startDate && endDate) {
      setStayDays(endDate.diff(startDate, 'day'));
      setShowRoomAvailability(true);
    }
  };

  const handleAvailabilityCheck = (isAvailable: boolean) => {
    setIsReservable(isAvailable);
  };

  const handleReserve = () => {
    if (isReservable) {
      setObjectState({
        accommodationId,
        roomId,
        checkInDate: selectedStartDate,
        checkOutDate: selectedEndDate,
        stayDays,
        selectPerson,
        price: currentPrice,
        title,
        accommodationTitle,
        accommodationImage,
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
    }
    if (isDateOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDateOpen]);

  return (
    <Container>
      <ImageContainer>
        {images.slice(0, 3).map((image, index) => (
          <StyledImage key={index} image={image} blur={false} />
        ))}
        <BlurImageContainer onClick={handleModalOpen}>
          <StyledImage image={images[3]} blur />
          <PlusBox>
            <PlusSign>+</PlusSign>
          </PlusBox>
        </BlurImageContainer>
      </ImageContainer>

      <Content>
        <Title>{title}</Title>
        <Subtitle>2인 기준, 최대 {MaxCount}인</Subtitle>
        <Description>기준 인원 초과 시 1인 50,000원 추가</Description>
        <Amenities>
          편의시설:
          <IconsImport icons={icons} />
        </Amenities>
      </Content>
      <PriceSection>
        <Price>{currentPrice.toLocaleString()}원</Price>
        {showRoomAvailability && (
          <RoomAvailability
            accommodationId={accommodationId}
            roomId={roomId}
            checkInDate={selectedStartDate}
            checkOutDate={selectedEndDate}
            onAvailabilityCheck={handleAvailabilityCheck}
          />
        )}
        {selectedStartDate && selectedEndDate && (
          <StayInfo>숙박일 수: {stayDays}박</StayInfo>
        )}
        <DateSelection ref={dateRef}>
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
        </DateSelection>
        <GuestSelection>
          <GuestCounter>
            <GuestCounterText>인원 수</GuestCounterText>
            <Button onClick={handleMinus}>-</Button>
            <GuestCount>{selectPerson} 인</GuestCount>
            <Button onClick={handlePlus}>+</Button>
          </GuestCounter>
        </GuestSelection>
        <PaymentButtonContainer>
          <Link
            href={
              selectedStartDate && selectedEndDate && isReservable
                ? '/detail'
                : '#'
            }
          >
            <Buttons
              label="예약 하기"
              fullWidth={false}
              onClick={handleReserve}
              buttonColor={
                selectedStartDate && selectedEndDate && isReservable
                  ? 'default'
                  : 'gray'
              }
            />
          </Link>
        </PaymentButtonContainer>
      </PriceSection>
      <ImageModal
        isOpen={ModalOpen}
        onClose={handleModalClose}
        images={images}
      />
    </Container>
  );
};

export default SelectRoom;

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #7d7d7d;
  box-shadow: 5px 5px 10px 0 #e5e5ec;
  padding: 10px;
  width: 100%;
  max-width: 1680px;
  margin: 40px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
`;

const BlurImageContainer = styled.div`
  position: relative;
  width: 250px;
  height: 130px;
  cursor: pointer;
`;

interface StyledImageProps {
  image: string;
  blur: boolean;
}

const StyledImage = styled.div<StyledImageProps>`
  width: 250px;
  height: 130px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  filter: ${(props) => (props.blur ? 'blur(1px)' : 'none')};
`;

const PlusBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 8px;
  & :hover {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f85b2b;
  }
`;

const PlusSign = styled.div`
  font-size: 48px;
  color: #000;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px;
`;

const Title = styled.h2`
  margin: 0;
`;

const Subtitle = styled.h3`
  margin: 5px 0;
`;

const Description = styled.p`
  margin: 5px 0;
`;

const Amenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 20px;
  line-height: 50px;
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DateSelection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-basis: 50%;

  .react-datepicker-wrapper {
    width: auto;
  }
`;

const GuestSelection = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 50%;
`;

const PaymentButtonContainer = styled.div`
  margin: 10px 0;
`;

const GuestCounter = styled.div`
  font-size: 1.438rem;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const GuestCounterText = styled.div`
  margin-right: 30px;
`;

const Button = styled.button`
  width: 60px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  padding: 5px 10px;
  &:hover {
    background-color: #0070f3;
    color: white;
  }
`;

const GuestCount = styled.div`
  width: 230px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin: 0 10px;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const SearchElementsWrapper = styled.div`
  min-width: 440px;
  flex-grow: 1;
  padding-bottom: 10px;
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
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;

  p {
    font-size: 1.2rem;
    font-weight: 700;
    width: 80px;
    margin: 0;
  }

  @media only screen and (max-width: 1440px) {
    height: 3.1rem;
    p {
      width: 70px;
      font-size: 1.1rem;
    }
  }
  @media only screen and (max-width: 1080px) {
    height: 3rem;
    p {
      width: 70px;
      font-size: 1rem;
    }
  }
`;

const SelectorDate = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media only screen and (max-width: 1440px) {
    font-size: 1.1rem;
  }
  @media only screen and (max-width: 1080px) {
    font-size: 1rem;
  }
`;

const StayInfo = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #0070f3;
`;
