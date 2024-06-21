import React from 'react';
import SlideButton from '../components/SlideButtons';
import PaginationButtons from '../components/PaginationButtons';

export default function Home() {
  return <div>
      <SlideButton arrowDirection="left" active={false} size='square'/>
      <SlideButton arrowDirection="right" active={true} size='smallCircle'/>      
      <PaginationButtons/>
  </div>;
}
