import React from 'react';
import './main.scss';
import '../../styles/base/_reset.scss';
import '../../styles/constants/_typography.scss';

const page = () => {
  const a = 1;
  if (a === 1) {
    console.log('true');
  }
  return (
    <div>
      <a href="/">test</a>test
    </div>
  );
};

export default page;
