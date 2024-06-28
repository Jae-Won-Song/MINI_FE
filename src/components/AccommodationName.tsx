'use client'
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import src from '../../public/images/mainBannerImage.jpg';

const AccommodationName = () => {
  return (
    <AccommodationNameContainer>
      <TitleContainer>
        <Title>숙소 이름</Title>
      </TitleContainer>
      <AccommodationImage src={src}></AccommodationImage>
      <InformationContainer>
        <InformationTitle>객실명</InformationTitle>
        <InformationText>A-1</InformationText>
      </InformationContainer>
      <InformationContainer>
        <InformationTitle>객실 정보</InformationTitle>
        <InformationText>더블침대 1개 객실 + 욕실 / 12.1평</InformationText>
      </InformationContainer>
      <InformationContainer>
        <InformationTitle>편의 시설</InformationTitle>
        <InformationText>Tv, 냉장고, 전기주전자, 찻잔, 티백, 물컵, 전화기, 금고, 슬리퍼, 욕실용품, 드라이기</InformationText>
      </InformationContainer>
    </AccommodationNameContainer>
  )
};

export default AccommodationName;

const AccommodationNameContainer = styled.div`
  width: 650px;
  height: 530px;
  border: 1px solid #7d7d7d;
  margin: 0 20px 0;
`;

const TitleContainer = styled.div`
  height: 60px;
  margin: 20px;
`;

const Title = styled.h2`
  margin: 20px auto;
  font-size: 30px;
  line-height: 60px;
`;

const AccommodationImage = styled(Image)`
  width: 600px;
  height: 180px;
  margin: 10px 20px;
`;

const InformationContainer = styled.div`
  width: 600px;
  height: 45px;
  margin: 15px auto;
  display: flex;
`;

const InformationTitle = styled.h4`
  width: 150px;
  margin: 10px auto;
  font-size: 20px;
`;
const InformationText = styled.div`
  width: 450px;
  margin: 10px auto;
  font-size: 16px;
`;