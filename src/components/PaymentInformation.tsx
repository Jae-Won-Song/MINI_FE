'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useDataContext } from '../contexts/DataContext';
import Buttons from './Buttons';
import { useRouter } from 'next/navigation';

interface ObjectStateType {
  stayDays: number;
  price: number;
  accommodationId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  selectPerson: number;
}

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};

const PaymentInformation = () => {
  const { objectState } = useDataContext() as unknown as {
    objectState: ObjectStateType;
  }; // useDataContext에서 numberState를 가져오도록 수정해야 합니다.
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // objectState.price가 undefined인 경우를 대비한 조건부 렌더링
  if (!objectState || !objectState.price) {
    return <LoadingMessage>데이터를 불러오는 중입니다...</LoadingMessage>;
  }

  const formattedCheckInDate = dayjs(objectState.checkInDate).format(
    'YYYY-MM-DD',
  );
  const formattedCheckOutDate = dayjs(objectState.checkOutDate).format(
    'YYYY-MM-DD',
  );

  const handleReservation = () => {
    router.push('/complete'); // ./test 페이지로 이동
  };

  return (
    <PaymentInformationContainer>
      <Information>결제 정보</Information>
      <InformationContainer>
        <InformationTitle>
          객실 가격 ({objectState.stayDays}박)
        </InformationTitle>
        <InformationText>
          {objectState.price.toLocaleString()}원
        </InformationText>
      </InformationContainer>
      <DivisionLine />
      <TotalInformationContainer>
        <TotalInformationTitle>총 결제 금액</TotalInformationTitle>
        <TotalInformationText>
          {objectState.price.toLocaleString()}원
        </TotalInformationText>
      </TotalInformationContainer>
      <ButtonContainer>
        <Buttons label="취소하기" buttonColor="gray" fullWidth={false} />
        <Buttons
          label="결제하기"
          fullWidth={false}
          onClick={handleReservation}
        />
      </ButtonContainer>
    </PaymentInformationContainer>
  );
};

export default PaymentInformation;

const PaymentInformationContainer = styled.div`
  width: 650px;
  height: 440px;
  border: 1px solid #7d7d7d;
  margin: 40px auto;
`;

const InformationContainer = styled.div`
  width: 600px;
  height: 40px;
  margin: 30px auto;
  display: flex;
  line-height: 10px;
`;

const Information = styled.div`
  width: 150px;
  margin: 30px;
  font-size: 20px;
`;

const InformationTitle = styled.h4`
  width: 150px;
  margin: 10px;
  font-size: 20px;
`;
const InformationText = styled.div`
  width: 350px;
  margin: 10px;
  font-size: 22px;
  text-align: right;
`;

const DivisionLine = styled.div`
  border-top: 1px solid #7d7d7d;
  margin: 10px auto;
  width: 600px;
`;

const TotalInformationContainer = styled.div`
  width: 600px;
  height: 40px;
  margin: 30px auto;
  display: flex;
  line-height: 10px;
`;

const TotalInformationTitle = styled.h4`
  width: 150px;
  margin: 10px;
  font-size: 20px;
`;
const TotalInformationText = styled.div`
  width: 350px;
  margin: 10px;
  font-size: 22px;
  text-align: right;
`;
const ButtonContainer = styled.div`
  width: 350px;
  height: 140px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const LoadingMessage = styled.div`
  margin: 20px;
  font-size: 18px;
  text-align: center;
  color: #333;
`;
