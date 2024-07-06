'use client';

import React from 'react';
import styled from 'styled-components';
import TravelPlaceKeywords from '@/components/TravelPlaceKeywords';
import ThemeSearch from '@/components/ThemeSearch';
import Events from '@/components/Events';

const UnderMainBanner = () => {
  return (
    <UnderMainBannerWrapper>
      <Events />
      <Hr />
      <ThemeSearch />
      <Hr />
      <TravelPlaceKeywords />
    </UnderMainBannerWrapper>
  );
};

const UnderMainBannerWrapper = styled.div`
  width: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding: 100px 0;
  z-index: -10;
  @media (min-width: 1080px) {
    width: 1000px;
  }
  @media (min-width: 1440px) {
    width: 1300px;
  }
  @media (min-width: 1920px) {
    width: 1500px;
  }
`;

const Hr = styled.hr`
  border-color: #f7f7fb;
`;
export default UnderMainBanner;