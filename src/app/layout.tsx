import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/base/_reset.scss';
import '../styles/constants/_colors.scss';
import Script from 'next/script';
import { AuthProvider } from 'src/contexts/AuthContext';
import { DataContextProvider } from 'src/contexts/DataContext';
import StyledComponentsRegistry from './lib/registry';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '여기 죽이지?: 패캠 미니프로젝트 숙소 예약 시스템',
  description:
    '패스트캠퍼스 부트캠프 미니프로젝트: 문화관광부 제공 API를 활용한 숙소 예약 시스템',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&libraries=services,clusterer&autoload=false`}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <StyledComponentsRegistry>
            <DataContextProvider>
              <Navbar />
              {children}
              <Footer />
            </DataContextProvider>
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
