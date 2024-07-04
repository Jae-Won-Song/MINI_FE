import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/base/_reset.scss';
import '../styles/constants/_colors.scss';
import StyledComponentsRegistry from './lib/registry';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from 'src/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '여기 죽이지?: 패캠 미니프로젝트 숙소 예약 시스템',
  description: '패스트캠퍼스 부트캠프 미니프로젝트: 문화관광부 제공 API를 활용한 숙소 예약 시스템',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
