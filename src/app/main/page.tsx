import React from 'react';
import './main.scss';
import '../../styles/base/_reset.scss';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import MainBanner from '@/components/MainBanner';
import MainSearchRegion from '@/components/MainSearchRegion';
import MainSearchDate from '@/components/MainSearchDate';

const page = () => {
  return (
    <>
      <Navbar />
      <MainBanner />
      <Footer />
      <MainSearchRegion/>
      <MainSearchDate/>
      <div>test</div>
    </>
  );
};

export default page;
