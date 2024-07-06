import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/base/_reset.scss';
import '../styles/constants/_colors.scss';
import Script from 'next/script';
import StyledComponentsRegistry from './lib/registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '여기 죽이지?: 패캠 미니프로젝트 숙소 예약 시스템',
  description:
    '패스트캠퍼스 부트캠프 미니프로젝트: 문화관광부 제공 API를 활용한 숙소 예약 시스템',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&libraries=services,clusterer&autoload=false`}
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
      <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ca1983a7e9ea0a0fb399052c7a1659cd&libraries=services,clusterer&autoload=false" />
    </html>
  );
};

export default RootLayout;
