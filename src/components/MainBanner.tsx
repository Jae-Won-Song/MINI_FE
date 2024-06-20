'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import bannerImage from '../../public/images/mainBannerImage.jpg';
import bannerText from '../../public/svgs/bannerText.svg';
import MainSearch from '@/components/MainSearch';

function MainBanner(): React.JSX.Element {
  return (
    <BannerWrapper>
      <BannerImageWrapper
        src={bannerImage}
        alt="Main Banner"
        layout="fill"
        objectFit="cover"
      />
      <ComponentContainer>
        <BannerTextWrapper>
          <p>
            <span>국내 숙박업소</span>
          </p>
          <p>정보를</p>
          <p>한눈에!</p>
        </BannerTextWrapper>
        <MainSearch />
      </ComponentContainer>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 700px;
  overflow: hidden;
  padding: 50px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1440px) {
    height: 550px;
  }
`;

const ComponentContainer = styled.div`
  width: 1500px;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  @media only screen and (max-width: 1440px) {
    width: 1250px;
  }
`;

const BannerImageWrapper = styled(Image)`
  object-fit: cover;
`;

const BannerTextWrapper = styled.div`
  width: 50%;
  margin-right: 50px;
  object-fit: contain;
  @media only screen and (max-width: 1440px) {
    width: 450px;
  }
  @media only screen and (max-width: 1080px) {
    width: 370px;
  }
  @media only screen and (max-width: 1080px) {
    width: 370px;
  }
  p {
    font-family: 'Cafe24Moyamoya-Face-v1.0';
    font-size: 5.5rem;
    white-space: none;
    @media only screen and (max-width: 1440px) {
      width: 450px;
      font-size: 4.5rem;
    }
    @media only screen and (max-width: 1080px) {
      width: 370px;
      font-size: 3.8rem;
    }
    span {
      font-family: 'Cafe24Moyamoya-Face-v1.0';
      color: #f85b2b;
    }
  }
`;
export default MainBanner;
