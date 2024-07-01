import React from 'react';
import './main.scss';
import '../../styles/base/_reset.scss';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import MainBanner from '@/components/MainBanner';

const page = () => {
  return (
    <>
      <Navbar />
      <Footer />
      <MainBanner />
      <div>test</div>
    </>
  );
};

export default page;
