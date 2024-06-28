"use client"

import styled from "styled-components";
import PaymentButton from "./PaymentButton";

const BookingInformation = () => {
  return (
    <BookingInformationContainer>
      <TitleContainer>
        <Title>예약 정보</Title>
      </TitleContainer>
      <TextBoxContainer>
        <TextBox>
          <TextTitle>예약일</TextTitle>
          <Text>2024년 6월 18일 (화) 14:00 ~ 2024년 6월 19일 (수) 11:00</Text>
        </TextBox>
        <TextBox>
        <TextTitle>인원</TextTitle>
        <Text>4명</Text>
        </TextBox>
        <EventBannerBox></EventBannerBox>
      </TextBoxContainer>
      <PaymentMethodContainer>
        <PaymentMethodText>결제 수단</PaymentMethodText>
        <PaymetMethodButtonContainer>
          <PaymentButton></PaymentButton>
        </PaymetMethodButtonContainer>
      </PaymentMethodContainer>
    </BookingInformationContainer>
  )
}

export default BookingInformation;

const BookingInformationContainer = styled.div`
  width: 1080px;
  height: 1010px;
  border: 1px solid #7d7d7d;
`;

const TitleContainer = styled.div`
  width: 1000px;
  height: 60px;
  margin: 20px auto;
`;

const Title = styled.h2`
  margin: 20px auto;
  font-size: 30px;
  line-height: 60px;
`;

const TextBoxContainer = styled.div`
  margin: 10px auto;
`;
const TextBox = styled.div`
  width: 1000px;
  height: 120px;
  border: 1px solid #7d7d7d;
  margin: 30px auto;
  box-shadow: 5px 5px 10px 0 #e5e5ec;
`;

const TextTitle = styled.h3`
  margin: 20px 30px;
`;
const Text = styled.div`
  margin: 25px 30px;
`;

const EventBannerBox = styled.div`
  width: 1000px;
  height: 270px;
  border: 1px solid #7d7d7d;
  margin: 30px auto;
  box-shadow: 5px 5px 10px 0 #e5e5ec;
  background-color: #d9d9d9;
`;

const PaymentMethodContainer = styled.div`
  width: 1000px;
  height: 280px;
  margin: 30px auto;
`;

const PaymentMethodText = styled.h3`
  margin: 20px auto;
  font-size: 18px;
`;

const PaymetMethodButtonContainer = styled.div`
  width: 1000px;
  height: 180px;
  margin: 30px auto;
`;
