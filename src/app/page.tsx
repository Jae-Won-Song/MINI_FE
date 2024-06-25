import React from 'react';
import SlideButtons from '../components/SlideButtons';
import PaginationButtons from '../components/PaginationButtons';

export default function Home() {
  return <div>
      <SlideButtons arrowDirection="left" active={false} size='square'/>
      <SlideButtons arrowDirection="right" active={true} size='smallCircle'/>
      <PaginationButtons/>
  </div>;
}
