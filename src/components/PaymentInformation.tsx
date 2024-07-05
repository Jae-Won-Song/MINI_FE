'use client'
import React from 'react';
import styled from 'styled-components';
import Buttons from './Buttons';

const PaymentInformation = () => {
  return (
    <PaymentInformationContainer>
      <Information>결제 정보</Information>
      <InformationContainer>
        <InformationTitle>객실 가격 (1박)</InformationTitle>
        <InformationText>250,000원</InformationText>
      </InformationContainer>
      <DivisionLine />
      <TotalInformationContainer>
        <TotalInformationTitle>총 결제 금액</TotalInformationTitle>
        <TotalInformationText>250,000원</TotalInformationText>
      </TotalInformationContainer>
      <ButtonContainer>
        <Buttons label="뒤로가기" fullWidth={false} />
        <Buttons label="등록" fullWidth={false} />
      </ButtonContainer>
    </PaymentInformationContainer>
  )
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
