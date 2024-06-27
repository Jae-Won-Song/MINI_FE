import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import MainBanner from '@/components/Banner/MainBanner';
import UnderMainBanner from '@/components/UnderMainBanner';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <MainBanner />
      <UnderMainBanner />
      <Footer />
    </div>
  );
}

export default Home;
