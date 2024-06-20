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
        <BannerTextWrapper
          src={bannerText}
          alt="Banner Text"
          objectFit="cover"
        />
        <MainSearch />
      </ComponentContainer>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 800px;
  overflow: hidden;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1440px) {
    height: 600px;
  }
  z-index: -5;
`;

const ComponentContainer = styled.div`
  width: 1620px;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 1;
`;

const BannerImageWrapper = styled(Image)`
  object-fit: cover;
`;
const BannerTextWrapper = styled(Image)`
  object-fit: fill;
  width: 600px;
  @media only screen and (max-width: 1440px) {
    width: 400px;
  }
`;

export default MainBanner;
